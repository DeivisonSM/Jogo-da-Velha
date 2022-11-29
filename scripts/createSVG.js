function createIcon0(){
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let shape = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");

    shape.setAttributeNS(null, "ry", "30%");
    shape.setAttributeNS(null, "rx", "30%");
    shape.setAttributeNS(null, "cy", "50%");
    shape.setAttributeNS(null, "cx", "50%");
    shape.setAttributeNS(null, "fill", "none");

    svg.appendChild(shape);
    svg.setAttribute("viewBox", "0 0 200 200");
    svg.classList.add("board__icon-0");

    return svg;
};  

function createIcon1(){
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    for (let i = 0; i < 2; i++) {
        let shape = document.createElementNS("http://www.w3.org/2000/svg", "line");

        shape.setAttributeNS(null, "x1", 90);
        shape.setAttributeNS(null, "y1", 300);
        shape.setAttributeNS(null, "x2", 710);
        shape.setAttributeNS(null, "y2", 300);
        shape.setAttributeNS(null, "fill", "none");
        shape.setAttributeNS(null, "transform", `rotate(${i === 0 ? 47 : -47} 400 300)`);

        svg.appendChild(shape);
    };

    svg.setAttribute("viewBox", "0 0 800 600");
    svg.classList.add("board__icon-1");

    return svg;
};

function verifyIcon(){
    return game.players[game.playerTurn].icon === 0 ? createIcon0() : createIcon1();    
};