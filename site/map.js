// var inside = require('point-in-polygon');

// var eckington = [[-76.997876,38.920688],[-76.996445,38.921145],[-76.996966,38.920129],[-76.997746,38.918707],[-76.998396,38.917589],[-76.999176,38.916116],[-76.999567,38.915354],[-77.000087,38.914592],[-77.000087,38.91449],[-77.000152,38.914186],[-77.000152,38.913982],[-77.000217,38.912967],[-77.000412,38.91256],[-77.001127,38.911087],[-77.001192,38.910985],[-77.001387,38.910579],[-77.001647,38.910071],[-77.001647,38.909766],[-77.001777,38.909512],[-77.001842,38.909462],[-77.001907,38.909258],[-77.001972,38.909106],[-77.002037,38.909055],[-77.002102,38.908954],[-77.002102,38.908801],[-77.002167,38.90875],[-77.002167,38.908649],[-77.002232,38.908547],[-77.002232,38.908446],[-77.002297,38.908344],[-77.002297,38.908293],[-77.002297,38.908242],[-77.002362,38.908191],[-77.002362,38.908141],[-77.002362,38.90809],[-77.002362,38.908039],[-77.002427,38.908039],[-77.002427,38.907988],[-77.002492,38.907988],[-77.002557,38.908039],[-77.002687,38.90809],[-77.002752,38.90809],[-77.002883,38.908141],[-77.003142,38.908293],[-77.003727,38.908496],[-77.003792,38.908547],[-77.004248,38.90875],[-77.004313,38.908801],[-77.004378,38.908801],[-77.004572,38.908903],[-77.004638,38.908903],[-77.004833,38.909004],[-77.005093,38.909106],[-77.005157,38.909157],[-77.005353,38.909207],[-77.005483,38.909258],[-77.005613,38.909309],[-77.005678,38.90936],[-77.005873,38.909411],[-77.006003,38.909512],[-77.006198,38.909563],[-77.006328,38.909614],[-77.006393,38.909665],[-77.006718,38.909817],[-77.006913,38.909868],[-77.007043,38.909918],[-77.007693,38.910223],[-77.008018,38.910375],[-77.008279,38.910477],[-77.008799,38.91068],[-77.008864,38.91068],[-77.009058,38.910782],[-77.009058,38.911087],[-77.009058,38.911138],[-77.009058,38.911189],[-77.009059,38.911442],[-77.009059,38.911595],[-77.009059,38.911849],[-77.009059,38.912458],[-77.009059,38.91261],[-77.009059,38.913322],[-77.009059,38.913626],[-77.009059,38.91383],[-77.009059,38.914084],[-77.009059,38.914795],[-77.009059,38.915252],[-77.009059,38.915557],[-77.009059,38.916268],[-77.009059,38.916623],[-77.009059,38.916827],[-77.009059,38.916979],[-77.009059,38.918097],[-77.006914,38.918097],[-77.006589,38.919265],[-77.004573,38.918351],[-77.004833,38.918249],[-77.003533,38.918707],[-77.002037,38.919214],[-77.000542,38.919773],[-76.999502,38.920129],[-76.999437,38.920129],[-76.999176,38.92023],[-76.998656,38.920434],[-76.998266,38.920535],[-76.997876,38.920688]];

// var here = [-77.00336659999999, 38.9148535];

// var mo = [-77.0031695, 38.9151687];

// var kitcheck = [-77.0450089, 38.9155375];

// var zero = [0,0];


// console.log('Here:      ', inside(here, eckington));
// console.log('Eckington: ', inside(mo, eckington));
// console.log('KitCheck:  ', inside(kitcheck, eckington));
// console.log('Zero:      ', inside(zero, eckington));

var dc = require('./dc-updated.json');

var minData = [];

dc.features.forEach(function(feature) {
	var data = {};

	data.n = feature.properties.name;
	// data.q = feature.properties.quadrant;

	if (feature.geometry.type === 'Polygon') {
		data.c = feature.geometry.coordinates[0];
		minData.push(data);
	} else if (feature.geometry.type === 'GeometryCollection') {
		feature.geometry.geometries.forEach(function(geo) {
			var newData = JSON.parse(JSON.stringify(data));
			newData.c = geo.coordinates[0];
		});
	}


});

console.log(JSON.stringify(minData));