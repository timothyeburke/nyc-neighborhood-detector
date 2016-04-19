var locating = false;

function inside(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

function get(url) {
    return new Promise(function(resolve, reject) {
        var local = localStorage.getItem(url);
        if (local) {
            resolve(JSON.parse(local));
            return;
        }
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", function() {
            resolve(JSON.parse(this.responseText));
            localStorage.setItem(url, this.responseText);
        });
        oReq.addEventListener('error', function() {
            reject();
        });
        oReq.open('GET', url);
        oReq.send();
    })
}

function position() {
    return new Promise(function(resolve, reject) {
        if (!navigator.geolocation) {
            reject('Geolocation not supported in this browser.');
            return;
        }
        navigator.geolocation.getCurrentPosition(function(position) {
            resolve(position);
        }, function() {
            reject('Error getting geolocation.');
        });
    });
}

function setContent(content) {
    var div = document.getElementById('content');
    div.innerHTML = content;
}

function ready() {
    if (locating) {
        return;
    }

    locating = true;

    setContent('<h1>Locating...</h1>');

    Promise.all([
        get('dc-updated.min.json'),
        get('dc.min.json'),
        position()
    ]).then(
        function(data) {
            var newLocationData = data[0];
            var oldLocationData = data[1];
            var position = data[2];
            var loc = [position.coords.longitude, position.coords.latitude];

            var oldNeighborhood;
            var newNeighborhood;

            for (var i = 0; i < newLocationData.length; i++) {
                var neighborhood = newLocationData[i];
                if (inside(loc, neighborhood.c)) {
                    newNeighborhood = neighborhood;
                    break;
                }
            }

            for (var i = 0; i < oldLocationData.length; i++) {
                var neighborhood = oldLocationData[i];
                if (inside(loc, neighborhood.c)) {
                    oldNeighborhood = neighborhood;
                    break;
                }
            }

            if (!newNeighborhood && !oldNeighborhood) {
                return Promise.reject('I don\'t think you\'re in DC.')
            }

            var name = newNeighborhood ? newNeighborhood.n : oldNeighborhood.n;
            var quadrant = oldNeighborhood.q;

            setContent('<h1>' + quadrant + ' DC</h1><h1>' + name + '</h1>');
        }
    ).catch(
        function(error) {
            setContent('<h1>' + error + '</h1>');
        }
    ).then(
        function() {
            locating = false;
        }
    );
}

ready();
