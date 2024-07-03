function ggbOnInit() {
  ggbApplet.setValue('showBG', 0);
  let nPoly = 1;
  const vertexList = [];

  const colors = {
    red: [255, 8, 94],
    yellow: [255, 202, 58],
    green: [138, 201, 38],
    blue: [25, 130, 196],
    purple: [106, 76, 147],
  };
  let activeColor = 'red';

  function makeMonotile(btn) {
    // initialize polyString, it will run at the end after all vertices are created
    let polyString = `poly${nPoly} = Polygon({`;

    // add vertices to polyString and close expression
    for (let i = 1; i <= 13; i++) {
      polyString += `P${nPoly}_${i}`;
      if (i < 13) {
        polyString += ',';
      }
    }
    polyString += '})';

    // vertex list is used to apply styles to non control point vertices
    for (let i = 2; i <= 13; i++) {
      vertexList.push(`P${nPoly}_${i}`);
    }

    // list of commands to construct the polygon
    // sign of the rotation angles are determined by the btn argument
    const polyCommands = [
      `P${nPoly}_1 = Point(HexGrid)`,
      `P${nPoly}_1ArrR = P${nPoly}_1 + (.02e,0)`,
      `P${nPoly}_1ArrL = P${nPoly}_1 + (-.02e,0)`,
      `P${nPoly}_1ArrU = P${nPoly}_1 + (0,.02e)`,
      `P${nPoly}_1ArrD = P${nPoly}_1 + (0,-.02e)`,
      `SetCoords(P${nPoly}_1, -.5, 0)`,
      `RotList${nPoly} = Sequence(Rotate(P${nPoly}_1 + (3,0), i*60°, P${nPoly}_1), i,0,5)`,
      `RotCircle${nPoly} = Circle(P${nPoly}_1, 3)`,
      `RotCtrlPt${nPoly} = Point(RotCircle${nPoly})`,
      `RotCtrlBG${nPoly} = (x(RotCtrlPt${nPoly}), y(RotCtrlPt${nPoly}))`,
      `RotDecArc${nPoly} = CircularArc(P${nPoly}_1, Rotate(RotCtrlPt${nPoly}, -7°*.1e, P${nPoly}_1),Rotate(RotCtrlPt${nPoly}, 7°*.1e, P${nPoly}_1))`,
      `RotDecArrCW${nPoly} = Segment(Rotate(RotCtrlPt${nPoly}, -5°*.1e, P${nPoly}_1),Rotate(RotCtrlPt${nPoly}, -7°*.1e, P${nPoly}_1))`,
      `RotDecArrCCW${nPoly} = Segment(Rotate(RotCtrlPt${nPoly}, 5°*.1e, P${nPoly}_1),Rotate(RotCtrlPt${nPoly}, 7°*.1e, P${nPoly}_1))`,
      `SetDecoration(RotDecArrCW${nPoly}, 0, 4)`,
      `SetDecoration(RotDecArrCCW${nPoly}, 0, 4)`,
      `SetVisibleInView(RotList${nPoly}, 1, false)`,
      `DelX${nPoly}_1 = Rotate(Segment(Rotate(RotCtrlPt${nPoly}, ${
        btn === 'q2' ? '-' : ''
      }60deg, P${nPoly}_1)+ (-.008e,0), Rotate(RotCtrlPt${nPoly}, ${
        btn === 'q2' ? '-' : ''
      }60deg, P${nPoly}_1) + (.008e,0)),-45deg,Rotate(RotCtrlPt${nPoly}, ${
        btn === 'q2' ? '-' : ''
      }60deg, P${nPoly}_1))`,
      `DelX${nPoly}_2 = Rotate(Segment(Rotate(RotCtrlPt${nPoly}, ${
        btn === 'q2' ? '-' : ''
      }60deg, P${nPoly}_1)+ (-.008e,0), Rotate(RotCtrlPt${nPoly}, ${
        btn === 'q2' ? '-' : ''
      }60deg, P${nPoly}_1) + (.008e,0)),45deg,Rotate(RotCtrlPt${nPoly}, ${
        btn === 'q2' ? '-' : ''
      }60deg, P${nPoly}_1))`,
      `DelXBB${nPoly} = Polygon({Corner(DelX${nPoly}_1, 1), Corner(DelX${nPoly}_2, 1), Corner(DelX${nPoly}_1,2), Corner(DelX${nPoly}_2,2)})`,
      `P${nPoly}_2 = Translate(P${nPoly}_1, (1/6)*Vector(P${nPoly}_1, RotCtrlPt${nPoly}))`,
      `P${nPoly}_3 = Rotate(P${nPoly}_1, ${
        btn === 'q2' ? '-' : ''
      }120°, P${nPoly}_2)`,
      `P${nPoly}_4 = Intersect(Circle(P${nPoly}_3, sqrt(3) / 2), Ray(P${nPoly}_3, Rotate(P${nPoly}_2, ${
        btn === 'q2' ? '' : '-'
      }90°, P${nPoly}_3)))`,
      `P${nPoly}_5 = Rotate(P${nPoly}_3, ${
        btn === 'q2' ? '-' : ''
      }120°, P${nPoly}_4)`,
      `P${nPoly}_6 = Intersect(Circle(P${nPoly}_5, 0.5), Ray(P${nPoly}_5, Rotate(P${nPoly}_4, ${
        btn === 'q2' ? '' : '-'
      }90°, P${nPoly}_5)))`,
      `P${nPoly}_7 = Intersect(Circle(P${nPoly}_6, 1), Ray(P${nPoly}_6, Rotate(P${nPoly}_5, ${
        btn === 'q2' ? '' : '-'
      }120°, P${nPoly}_6)))`,
      `P${nPoly}_8 = Intersect(Circle(P${nPoly}_7, 0.5), Ray(P${nPoly}_7, Rotate(P${nPoly}_6, ${
        btn === 'q2' ? '' : '-'
      }120°, P${nPoly}_7)))`,
      `P${nPoly}_9 = Intersect(Circle(P${nPoly}_8, sqrt(3) / 2), Ray(P${nPoly}_8, Rotate(P${nPoly}_7, ${
        btn === 'q2' ? '-' : ''
      }90°, P${nPoly}_8)))`,
      `P${nPoly}_10 = Rotate(P${nPoly}_8, ${
        btn === 'q2' ? '' : '-'
      }120°, P${nPoly}_9)`,
      `P${nPoly}_11 = Intersect(Circle(P${nPoly}_10, 0.5), Ray(P${nPoly}_10, Rotate(P${nPoly}_9, ${
        btn === 'q2' ? '' : '-'
      }90°, P${nPoly}_10)))`,
      `P${nPoly}_12 = Rotate(P${nPoly}_10, ${
        btn === 'q2' ? '' : '-'
      }120°, P${nPoly}_11)`,
      `P${nPoly}_13 = Intersect(Circle(P${nPoly}_12, sqrt(3) / 2), Ray(P${nPoly}_12, Rotate(P${nPoly}_11, ${
        btn === 'q2' ? '-' : ''
      }90°, P${nPoly}_12)))`,
      polyString,
    ];

    // build the polygon, hide vertices that aren't the move control point
    polyCommands.forEach((cmd) => ggbApplet.evalCommand(cmd));
    vertexList.forEach((vertex) => ggbApplet.setVisible(vertex, false));

    // set colors, layers, point sizes, styles, and selectability as needed
    ggbApplet.setColor(`P${nPoly}_1`, 0, 0, 0);
    ggbApplet.setColor(`P${nPoly}_2`, 0, 0, 0);
    ggbApplet.setColor(`RotCtrlBG${nPoly}`, 255, 255, 255);
    ggbApplet.setColor(`RotCtrlPt${nPoly}`, 0, 0, 0);

    ggbApplet.setColor(
      'poly' + nPoly,
      colors[activeColor][0],
      colors[activeColor][1],
      colors[activeColor][2]
    );

    ggbApplet.setLayer(`P${nPoly}_1`, 7);
    ggbApplet.setLayer(`RotCtrlPt${nPoly}`, 7);
    ggbApplet.setLayer(`RotCtrlBG${nPoly}`, 6);
    ggbApplet.setLayer(`RotDecArc${nPoly}`, 2);
    ggbApplet.setLayer(`DelXBB${nPoly}`, 2);
    ggbApplet.setLayer(`DelX${nPoly}_1`, 2);
    ggbApplet.setLayer(`DelX${nPoly}_2`, 2);
    ggbApplet.setLayer(`poly${nPoly}`, 1);

    ggbApplet.setPointSize(`P${nPoly}_1`, 6);
    ggbApplet.setPointSize(`RotCtrlPt${nPoly}`, 6);
    ggbApplet.setPointSize(`RotCtrlBG${nPoly}`, 9);

    ggbApplet.setPointStyle(`P${nPoly}_2`, 10);

    ggbApplet.setFixed(`RotCtrlBG${nPoly}`, false, false);
    ggbApplet.setFixed(`DelX${nPoly}_1`, false, false);
    ggbApplet.setFixed(`DelX${nPoly}_2`, false, false);
    ggbApplet.setVisible(`RotCircle${nPoly}`, false);

    ggbApplet.setFilling(`DelXBB${nPoly}`, 0.05);
    ggbApplet.setLineThickness(`DelXBB${nPoly}`, 0);
    ggbApplet.setColor(`DelXBB${nPoly}`, 0, 0, 0);

    // array of arrow markers and their corresponding style numbers
    let arrows = [
      [`P${nPoly}_1ArrR`, 8],
      [`P${nPoly}_1ArrL`, 9],
      [`P${nPoly}_1ArrU`, 6],
      [`P${nPoly}_1ArrD`, 7],
    ];

    // set various properties for all arrows
    arrows.forEach((arrow) => {
      ggbApplet.setPointStyle(arrow[0], arrow[1]);
      ggbApplet.setFixed(arrow[0], false, false);
      ggbApplet.setPointSize(arrow[0], 4);
      ggbApplet.setLayer(arrow[0], 7);
      ggbApplet.setColor(arrow[0], 0, 0, 0);
    });

    nPoly++;
  }

  function hideControls() {
    const controls = ggbApplet.getAllObjectNames().filter((name) => {
      return (
        name.includes(`Rot`) ||
        (name.includes('_1') && ggbApplet.getObjectType(name) === 'point') ||
        name.includes('Arr') ||
        name.includes('DelX')
      );
    });
    console.log(controls);

    controls.forEach((control) => {
      ggbApplet.setVisible(control, false);
    });
  }

  function checkClick(objName) {
    console.log(objName);
    if (
      objName.includes('RotCtrlPt') ||
      (objName.includes('_1') &&
        ggbApplet.getObjectType(objName) === 'point') ||
      objName.includes('Arr')
    )
      return;

    // change selected color circle and update activeColor
    if (Object.keys(colors).includes(objName)) {
      Object.keys(colors).forEach((color) => {
        ggbApplet.setColor(color + 'OL', 0, 0, 0);
      });

      ggbApplet.setColor(objName + 'OL', 255, 255, 255);
      activeColor = objName;
    }

    const objNum = objName?.match(/\d+\b/)[0];

    if (objName.includes('DelX')) {
      ggbApplet.deleteObject(`poly${objNum}`);
      ggbApplet.deleteObject(`P${objNum}_1`);
      return;
    }

    if (objName.includes('poly')) {
      hideControls();
      const toShow = ggbApplet
        .getAllObjectNames('segment')
        .concat(ggbApplet.getAllObjectNames('point'))
        .concat(ggbApplet.getAllObjectNames('arc'))
        .filter((name) => {
          return (
            name === `P${objNum}_1` ||
            (name.includes(`P${objNum}`) && name.includes('Arr')) ||
            (name.includes(`Rot`) && name.endsWith(objNum)) ||
            name === `DelX${objNum}_1` ||
            name === `DelX${objNum}_2` ||
            name === `DelXBB${objNum}`
          );
        });
      console.log(toShow);
      toShow.forEach((control) => {
        ggbApplet.setVisible(control, true);
      });

      return;
    }

    hideControls();
  }

  function getClosestPoint(point, pointArray) {
    //point is [float, float] and pointArray is an array of points
    let closestPoint = pointArray[0];

    let minDistance = Math.sqrt(
      (point[0] - pointArray[0][0]) ** 2 + (point[1] - pointArray[0][1]) ** 2
    );

    for (let i = 1; i < pointArray.length; i++) {
      let distance = Math.sqrt(
        (point[0] - pointArray[i][0]) ** 2 + (point[1] - pointArray[i][1]) ** 2
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = pointArray[i];
        console.log(
          `New minDistance: ${minDistance}, closest point is ${closestPoint}`
        );
      }
    }
    return closestPoint;
  }

  function snapRotation(event) {
    if (event.type !== 'dragEnd' && event.type !== 'mouseDown') return;
    const objName = event.target;

    if (objName.includes('RotCtrlPt')) {
      const objNum = objName.match(/\d+\b/);
      const RotList = `RotList${objNum}`;
      const RotCtrlPt = `RotCtrlPt${objNum}`;
      const RotCtrlPtCoords = [
        ggbApplet.getXcoord(RotCtrlPt),
        ggbApplet.getYcoord(RotCtrlPt),
      ];
      const latexString = ggbApplet.getLaTeXString(RotList);
      const coordsArray = [
        ...latexString.matchAll(/\((-?\d+\.?\d*),\s(-?\d+\.?\d*)/g),
      ].map((arr) => arr.map((str) => parseFloat(str)).splice(1, 2));

      const snapPoint = getClosestPoint(RotCtrlPtCoords, coordsArray);

      ggbApplet.setCoords(RotCtrlPt, snapPoint[0], snapPoint[1]);
    }

    if (objName.includes(`poly`)) {
      ggbApplet.evalCommand(`SelectObjects(P${objName.slice(4)}_1)`);
    }
  }

  ggbApplet.registerObjectClickListener('q1', makeMonotile);
  ggbApplet.registerObjectClickListener('q2', makeMonotile);
  ggbApplet.registerObjectClickListener('q5', () => {
    ggbApplet.setValue('showBG', ggbApplet.getValue('showBG') === 0 ? 1 : 0);
    ggbApplet.setTextValue(
      'text4',
      ggbApplet.getValue('showBG') === 0 ? 'Show Pattern' : ' Hide Pattern'
    );
  });

  ggbApplet.registerClickListener(checkClick);
  ggbApplet.registerClientListener(snapRotation);
}
