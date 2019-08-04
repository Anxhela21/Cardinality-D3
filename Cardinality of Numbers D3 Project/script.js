let colors = [
	{ color: "red", numbers: "1,2,3,4,5..." },
	{ color: "orange", numbers: "..,-2, -1, 0, 1, 2,.." },
	{ color: "yellow", numbers: "..,-2.5, -1.3, 0, 1, 2.4, 3.5,.." },
	{ color: "white", numbers: "a+bi, π, " }
];


let svgWidth = window.innerWidth,
	svgHeight = 400;
			// svgHeight = window.innerHeight,
	nodes = d3.range(100).map(function() {
		return {
			radius: Math.random() * 3,
			cx: Math.random() * svgWidth - 50,
			cy: Math.random() * svgHeight - 50
		};
	});

let svg = d3
	.select("body")
	.append("svg")
	.attr("width", svgWidth)
	.attr("height", svgHeight);

//GLOW EFFECT:
//Container for the gradients
let defs = svg.append("defs");
let filter = defs.append("filter").attr("id", "glow");
filter
	.append("feGaussianBlur")
	.attr("stdDeviation", "3")
	.attr("result", "coloredBlur");
let feMerge = filter.append("feMerge");
feMerge.append("feMergeNode").attr("in", "coloredBlur");
feMerge.append("feMergeNode").attr("in", "SourceGraphic");


//Apply to your element(s)
d3.selectAll("circle").style("filter", "url(#glow)");

//Color-radius mapping
let colorScale = d3
	.scaleQuantize()
	.domain(d3.extent(nodes, d => d.radius))
	.range([
		"red",
		"orange",
		"yellow",
		"white",
		"white",
    "white",
		"white",
    "white",
		"white"
	]);

//Radius scale:
let radiusScale = d3
	.scaleLinear()
	.domain(d3.extent(nodes, d => d.radius))
	.range([0.8, 3.0]);


//Line that connect elements:
// var line = svg.append("line")
//         .style("stroke", "black")
//         .attr("x1", 15)
//         .attr("y1", 10)
//         .attr("x2", 25)
//         .attr("y2", 30);


// Attempt to create lines: 


// function cantor(){
//   return path1
// }

// let array = [
//   {"cx":"94.04899147281097", "cy" : "27.239564843868536"},{"cx" :"248.23303264879803","cy" :"20.98065394874284"},{"cx" :"157.47501528819203","cy" :"219.31111860807596"},{"cx" :"175.34273454481715","cy" :"259.94203131122094"},{"cx" :"137.12955656370173","cy" :"267.87929183196263"},{"cx" :"442.0042013001194","cy" :"199.0853792857936"},
//              {"cx" :"3.828132841765715","cy" :"199.12048132019544"},{"cx" :"154.164616866077","cy" :"173.9352012779582"},{"cx" :"146.04285629340126","cy" :"337.1673897475449"},{"cx" :"259.36700455404156","cy" :"324.22422197505745"},{"cx" :"420.59650427958115","cy" :"288.37631019392757"},{"cx" :"610.5537576076779","cy" :"239.0778062749436"}
// ];

// var line = d3.line()
//     .x( d => d.cx )
//     .y( d => d.cy );

// let path1 = svg
//   .append("path")
//   .attr("d", line(array) )
//   .attr("stroke", "blue")

// var totalLength = path1.node().getTotalLength();

// path1
//   .attr("stroke-dasharray", totalLength + " " + totalLength)
//   .attr("stroke-dashoffset", totalLength)
//   .transition()
//     .duration(2000)
//   .attr("stroke-dashoffset", 0);


// make button that makes the following happen:

//set two points
//draw circles at ends of two points
//make funciton that if circle is red other circle is orange. (if then)


function ConnCircles(){
 circle
  .beginpath()
  .attr(100,75,50,0,2*Math.PI)
  .attr("stroke");
}

//Creating circles:
let circles = svg.selectAll("circle").data(nodes);
circles
	.enter()
	.append("circle")
	.attr("class", d => colorScale(d.radius))
	.attr("cx", d => d.cx)
	.attr("cy", d => d.cy)
	// .attr("r", d => { console.log(d.radius); return d.radius})
	.attr("r", d => radiusScale(d.radius))
	.style("fill", d => colorScale(d.radius))
	// .on("mouseover", handleMouseOver)
	// .on("mouseout", handleMouseOut);

function handleMouseOver() {
	let circleClass = d3.select(this).attr('class')
	d3.selectAll(`.${circleClass}`)
	  .transition()
		.duration(500)
		.attr("r", d => radiusScale(d.radius) * 2)
	
	d3.select('.tooltip')
		.style("visibility", "visible")
		.style("top", event.pageY - 10 + "px")
		.style("left", event.pageX + 10 + "px")
		.text( function() {
		 switch(circleClass){
			 case 'red' : return "red"; break
			 case 'white' : return 'white'; break
			 case 'orange' : return 'orange'; break
			 case 'yellow' : return 'orange'; break
			}	
		}).style( 'background-color', d => {
			 switch(circleClass){
			 case 'red' : return "red"; break
			 case 'white' : return 'white'; break
			 case 'orange' : return 'orange'; break
			 case 'yellow' : return 'orange'; break
			}	
	})
}

function handleMouseOut() {
	d3.selectAll("circle")
		.transition()
		.duration(500)
		.attr("r", d => radiusScale(d.radius));
	d3.select('.tooltip').style("visibility", "hidden");
}

//Buttons:
d3.selectAll("button").on("click", handleButtonClick);

let activeCircle = ''

function handleButtonClick() {
	let circleClass = d3.select(this).attr('id')
	if(activeCircle) {
		d3.selectAll(`.${activeCircle}`)
			.transition().duration(500)
			.attr("r", d => radiusScale(d.radius))
	}
	activeCircle = circleClass
	
	d3.selectAll(`.${circleClass}`)
		.transition()
		.duration(1000)
		.attr("r", 15)
		.style("filter", "url(#glow)");
	
	d3.select('.tooltip')
		.transition()
		.duration(500)
		.style('opacity',1)
		.text( function() {
		 switch(circleClass){
			 case 'red' : 
				 return "Red stars represent the set of Natural Numbers. ex. 1,2,3,4... It's cardinality is countably infinite.";
				 break
			 case 'white' : 
				 return 	"White stars represent the set of real or complex numbers. ex. a+bi, π, e. They have uncountably infinite cardinality."; 
				 break
			 case 'orange' : 
				 return 		"Orange stars represent the set of Integers. ex. ..,-2,-1,0,1,2,.. It's cardinality is countably infinite. ";
				 break
			 case 'yellow' : 
				 return	"Yellow stars represent the set of Rational Numbers. ex...,-2.5, -1.3, 0, 1, 2.4, 3.5,.. It's cardinality is countably infinite.";
				 break
			}	
		}).style( 'background-color', d => {
		   debugger
			 switch(circleClass){
			 case 'red' : return "red"; break
			 case 'white' : return 'white'; break
			 case 'orange' : return 'orange'; break
			 case 'yellow' : return 'yellow'; break
			}	
	})
}



//  let toolinfin = d3
//   .selectAll('body')
// 	.append("div")
// 	.style("position", "absolute")
//   .style("border-radius","8px")
// 	.style("z-index", "200")
//   .style("opacity", .8)
// 	.style("visibility", "hidden")
// 	.style("background", "#E040FB")
// 	.text(
// 		"Infinitely countable sets, are sets that can be placed in a one-to-one correspondence with the set of natural numbers. We can see that the real and complex numbers cannot be put into that correspondence. We have many more white stars than we do the colorful stars..infinitely many to be exact!");

// function infinCount(){
// 	return toolinfin
// 	  .transition()
// 		.style("visibility", "visible")
// 		.style("top", event.pageY + 100 + "px")
// 		.style("left", event.pageX - 250 + "px")
// 	  .selectAll(`.${activeCircle}`)
// 	   activeCircle = "white"
// }
