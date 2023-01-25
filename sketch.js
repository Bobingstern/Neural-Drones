
async function graph(brain) {
  const element = document.getElementById("vis2")
  const { nodes: neurons, connections } = brain.toJSON()

  // Flattens neuron layers from `Network.toJSON` and converts it to 'vis-network'
  const nodes = new vis.DataSet(neurons.map((neuron, i) => ({
    id: neuron.index,
    title: i,
    label: i,
    color: (neuron.type === "hidden") ? "orange" : (neuron.type === "output") ? "blue" : "yellow"
  })
  ))

  // Flattens connections from `Network.toJSON` and converts it into `vis-network`
  const edges = new vis.DataSet(connections.map(connection => ({
    from: connection.from,
    to: connection.to,
    title: connection.weight,
    color: (connection.weight == 1) ? "white" : (connection.weight > 0) ? "green" : "red"
  })
  ))

  // Vis.js Network Options
  // Will have a "left-to-right" graph with "smooth" lines representing
  // connections by default
  const options = {
    autoResize: true,
    height: '250px',
    width: '100%',
    edges: {
      arrows: {
        to: { enabled: true, scaleFactor: 1, type: 'arrow' }
      },
      smooth: {
        type: "cubicBezier",
        forceDirection: "horizontal"
      }
    },
    layout: {
      hierarchical: {
        direction: "LR",
        sortMethod: "directed"
      }
    },
    physics: true
  }

  let network = new vis.Network(element, { nodes, edges }, options)
}

function randArr(l) {
  let arr = []
  for (let i = 0; i < l; i++) {
    arr.push(Math.random() * 2 - 1)
  }
  return arr
}


let net_c =
  '{"nodes":[{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":0},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":1},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":2},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":3},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":4},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":5},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":6},{"bias":-0.7468115052839448,"type":"output","squash":"TANH","mask":1,"index":7},{"bias":-2.64113841569143,"type":"output","squash":"BIPOLAR_SIGMOID","mask":1,"index":8},{"bias":-0.29870429238668045,"type":"output","squash":"SELU","mask":1,"index":9},{"bias":-2.2510340490290437,"type":"output","squash":"SOFTSIGN","mask":1,"index":10}],"connections":[{"weight":13.600794272512886,"from":6,"to":10,"gater":null},{"weight":1.1165542391806276,"from":5,"to":10,"gater":null},{"weight":12.965441570144943,"from":6,"to":9,"gater":null},{"weight":-0.05034632092118349,"from":4,"to":10,"gater":null},{"weight":1.1349924429348617,"from":5,"to":9,"gater":null},{"weight":-8.397604651336646,"from":6,"to":8,"gater":null},{"weight":1.799522403771065,"from":3,"to":10,"gater":null},{"weight":0.1541874845116184,"from":4,"to":9,"gater":null},{"weight":1.6452380564892195,"from":5,"to":8,"gater":null},{"weight":-3.465610212525536,"from":6,"to":7,"gater":null},{"weight":5.487121986864974,"from":2,"to":10,"gater":null},{"weight":-0.06838035159758418,"from":3,"to":9,"gater":null},{"weight":0.49952513215181593,"from":4,"to":8,"gater":null},{"weight":1.6452380564892195,"from":5,"to":7,"gater":null},{"weight":-2.4930737976786106,"from":1,"to":10,"gater":null},{"weight":2.532252685803626,"from":2,"to":9,"gater":null},{"weight":1.9907647602371665,"from":3,"to":8,"gater":null},{"weight":-0.12723443158529946,"from":4,"to":7,"gater":null},{"weight":3.8643179611571044,"from":0,"to":10,"gater":null},{"weight":-5.9138987490330255,"from":1,"to":9,"gater":null},{"weight":3.5076196450550468,"from":2,"to":8,"gater":null},{"weight":0.03731194064632626,"from":3,"to":7,"gater":null},{"weight":-0.024382718963686226,"from":0,"to":9,"gater":null},{"weight":-9.583169172781675,"from":1,"to":8,"gater":null},{"weight":1.3124692728685954,"from":2,"to":7,"gater":null},{"weight":-1.9787993929654006,"from":0,"to":8,"gater":null},{"weight":-10.487203595658356,"from":1,"to":7,"gater":null},{"weight":1.7084487236177928,"from":0,"to":7,"gater":null}],"input":7,"output":4,"dropout":0}'
let net_b =
  '{"nodes":[{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":0},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":1},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":2},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":3},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":4},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":5},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":6},{"bias":0.13576151216208532,"type":"hidden","squash":"GAUSSIAN","mask":1,"index":7},{"bias":-0.07678080411203987,"type":"hidden","squash":"ABSOLUTE","mask":1,"index":8},{"bias":0.8828910570980832,"type":"hidden","squash":"TANH","mask":1,"index":9},{"bias":-0.03430864220411067,"type":"hidden","squash":"TANH","mask":1,"index":10},{"bias":-0.6531961594680017,"type":"hidden","squash":"GAUSSIAN","mask":1,"index":11},{"bias":-0.019426748420317747,"type":"hidden","squash":"STEP","mask":1,"index":12},{"bias":-0.019426748420317747,"type":"hidden","squash":"STEP","mask":1,"index":13},{"bias":-0.03430864220411067,"type":"hidden","squash":"IDENTITY","mask":1,"index":14},{"bias":-1.6937218677402295,"type":"hidden","squash":"ABSOLUTE","mask":1,"index":15},{"bias":0.06692228176667095,"type":"hidden","squash":"IDENTITY","mask":1,"index":16},{"bias":1.1529623146400996,"type":"output","squash":"INVERSE","mask":1,"index":17},{"bias":0.09901537821636208,"type":"output","squash":"SINUSOID","mask":1,"index":18},{"bias":-1.270748586848002,"type":"output","squash":"BENT_IDENTITY","mask":1,"index":19},{"bias":-0.060341411353064346,"type":"output","squash":"INVERSE","mask":1,"index":20}],"connections":[{"weight":-0.2957727483415705,"from":14,"to":20,"gater":null},{"weight":0.07554538766821148,"from":15,"to":18,"gater":null},{"weight":-0.08851158781985667,"from":16,"to":17,"gater":null},{"weight":0.07089117144725177,"from":15,"to":17,"gater":null},{"weight":-0.05368547520504983,"from":11,"to":18,"gater":null},{"weight":-0.08906987344242752,"from":12,"to":17,"gater":null},{"weight":0.06745372659003737,"from":11,"to":17,"gater":null},{"weight":0.00009440267868621177,"from":13,"to":14,"gater":null},{"weight":2.3031525955274312,"from":6,"to":20,"gater":null},{"weight":0.3807463498427365,"from":7,"to":19,"gater":null},{"weight":-0.029170958411276038,"from":5,"to":20,"gater":null},{"weight":0.054342318622409236,"from":8,"to":17,"gater":null},{"weight":0.09658000426766425,"from":12,"to":13,"gater":null},{"weight":0.29107075083274636,"from":4,"to":20,"gater":null},{"weight":0.16383794104446375,"from":5,"to":19,"gater":null},{"weight":0.3807463498427365,"from":7,"to":17,"gater":null},{"weight":0.8702799053738435,"from":3,"to":20,"gater":null},{"weight":2.2428321031185945,"from":2,"to":20,"gater":null},{"weight":0.026914887597238257,"from":3,"to":19,"gater":null},{"weight":-0.6859913901724549,"from":5,"to":17,"gater":null},{"weight":0.060906952772282225,"from":6,"to":16,"gater":null},{"weight":-0.005413110029880916,"from":8,"to":14,"gater":null},{"weight":2.2428321031185945,"from":2,"to":19,"gater":null},{"weight":0.08692531610040341,"from":9,"to":12,"gater":null},{"weight":0.08624729368550055,"from":10,"to":11,"gater":null},{"weight":-1.4477806899796508,"from":1,"to":19,"gater":null},{"weight":0.08979691664916054,"from":8,"to":12,"gater":null},{"weight":-0.06273275013460688,"from":0,"to":19,"gater":null},{"weight":2.7685317098171356,"from":2,"to":17,"gater":null},{"weight":-0.040578856417675495,"from":6,"to":13,"gater":null},{"weight":-0.02404953680181135,"from":9,"to":10,"gater":null},{"weight":5.109412405508154,"from":1,"to":17,"gater":null},{"weight":0.062183880851598206,"from":7,"to":11,"gater":null},{"weight":-0.09793832048781406,"from":5,"to":12,"gater":null},{"weight":-0.009022683027006512,"from":1,"to":15,"gater":null},{"weight":-0.02897209266527105,"from":4,"to":12,"gater":null},{"weight":-0.009022683027006512,"from":1,"to":14,"gater":null},{"weight":-0.019618994527610262,"from":5,"to":10,"gater":null},{"weight":4.516763180792587,"from":0,"to":14,"gater":null},{"weight":0.3120010476871343,"from":3,"to":11,"gater":null},{"weight":1.0413111541930484,"from":6,"to":8,"gater":null},{"weight":5.279803280282411,"from":0,"to":11,"gater":null},{"weight":-0.06277467585928172,"from":3,"to":8,"gater":null},{"weight":-0.04154490885826903,"from":4,"to":7,"gater":null},{"weight":0.039328637098405006,"from":3,"to":7,"gater":null},{"weight":-0.3295970894613913,"from":0,"to":9,"gater":null},{"weight":0.06121264702385454,"from":1,"to":7,"gater":null}],"input":7,"output":4,"dropout":0}'
let net_a = 
  '{"nodes":[{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":0},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":1},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":2},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":3},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":4},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":5},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":6},{"bias":-0.012869799052508929,"type":"hidden","squash":"BIPOLAR","mask":1,"index":7},{"bias":-0.41619650503697336,"type":"hidden","squash":"BIPOLAR","mask":1,"index":8},{"bias":-0.41619650503697336,"type":"hidden","squash":"BIPOLAR","mask":1,"index":9},{"bias":-0.5385877333357346,"type":"output","squash":"BIPOLAR_SIGMOID","mask":1,"index":10},{"bias":0.03387917122015338,"type":"output","squash":"SINUSOID","mask":1,"index":11},{"bias":-0.33730752399914543,"type":"output","squash":"SELU","mask":1,"index":12},{"bias":0.10551928192634907,"type":"output","squash":"SOFTSIGN","mask":1,"index":13}],"connections":[{"weight":0.0996392155787508,"from":9,"to":13,"gater":null},{"weight":0.040491668614730886,"from":8,"to":13,"gater":null},{"weight":0.0996392155787508,"from":9,"to":12,"gater":null},{"weight":0.0996392155787508,"from":7,"to":13,"gater":null},{"weight":0.0996392155787508,"from":8,"to":12,"gater":null},{"weight":-0.0320587787760251,"from":9,"to":11,"gater":null},{"weight":22.768061290234833,"from":6,"to":13,"gater":null},{"weight":0.0996392155787508,"from":7,"to":12,"gater":null},{"weight":0.09820686609670015,"from":8,"to":11,"gater":null},{"weight":0.09820686609670015,"from":9,"to":10,"gater":null},{"weight":0.21118824777745213,"from":5,"to":13,"gater":null},{"weight":21.847917369605753,"from":6,"to":12,"gater":null},{"weight":-0.04629813617341108,"from":7,"to":11,"gater":null},{"weight":0.09820686609670015,"from":8,"to":10,"gater":null},{"weight":-0.05219380687690909,"from":4,"to":13,"gater":null},{"weight":1.277673251768206,"from":5,"to":12,"gater":null},{"weight":-12.845965029701034,"from":6,"to":11,"gater":null},{"weight":0.0028640788364989456,"from":7,"to":10,"gater":null},{"weight":-0.42523663144824897,"from":8,"to":9,"gater":null},{"weight":-0.05592435285182456,"from":3,"to":13,"gater":null},{"weight":-0.010494718209101223,"from":4,"to":12,"gater":null},{"weight":0.8358027363799682,"from":5,"to":11,"gater":null},{"weight":-18.134988468252804,"from":6,"to":10,"gater":null},{"weight":0.025912889153292762,"from":7,"to":9,"gater":null},{"weight":2.8272050486776803,"from":2,"to":13,"gater":null},{"weight":0.6331330375699767,"from":3,"to":12,"gater":null},{"weight":0.05535960544789162,"from":4,"to":11,"gater":null},{"weight":2.686514368288001,"from":5,"to":10,"gater":null},{"weight":0.025912889153292762,"from":7,"to":8,"gater":null},{"weight":1.5850083765296632,"from":1,"to":13,"gater":null},{"weight":3.390381800442,"from":2,"to":12,"gater":null},{"weight":-0.0025448616502655452,"from":3,"to":11,"gater":null},{"weight":-0.5994400952955651,"from":4,"to":10,"gater":null},{"weight":0.08371086734264499,"from":5,"to":9,"gater":null},{"weight":-15.466003595814968,"from":6,"to":8,"gater":null},{"weight":0.5660430169165339,"from":0,"to":13,"gater":null},{"weight":-2.6939546591410126,"from":1,"to":12,"gater":null},{"weight":2.6208510771297004,"from":2,"to":11,"gater":null},{"weight":-0.05592435285182456,"from":3,"to":10,"gater":null},{"weight":0.13480140750450867,"from":4,"to":9,"gater":null},{"weight":-0.05958470394037745,"from":5,"to":8,"gater":null},{"weight":2.0323586040630843,"from":6,"to":7,"gater":null},{"weight":-0.5120765822716112,"from":0,"to":12,"gater":null},{"weight":-2.21620188553102,"from":1,"to":11,"gater":null},{"weight":3.3941843144623456,"from":2,"to":10,"gater":null},{"weight":-0.6342260722822375,"from":3,"to":9,"gater":null},{"weight":0.13480140750450867,"from":4,"to":8,"gater":null},{"weight":-0.4277108337369636,"from":0,"to":11,"gater":null},{"weight":-8.813053386124794,"from":1,"to":10,"gater":null},{"weight":0.25578366595639584,"from":2,"to":9,"gater":null},{"weight":0.026550805824357926,"from":3,"to":8,"gater":null},{"weight":-0.033305443617437286,"from":4,"to":7,"gater":null},{"weight":2.680025155304666,"from":0,"to":10,"gater":null},{"weight":-0.3046064670372608,"from":1,"to":9,"gater":null},{"weight":0.25578366595639584,"from":2,"to":8,"gater":null},{"weight":2.680025155304666,"from":0,"to":9,"gater":null},{"weight":-1.6977612588967133,"from":1,"to":8,"gater":null},{"weight":-0.007970667679553761,"from":0,"to":8,"gater":null},{"weight":0.21329631573943175,"from":1,"to":7,"gater":null},{"weight":-0.007970667679553761,"from":0,"to":7,"gater":null}],"input":7,"output":4,"dropout":0}'
let net_d = 
  '{"nodes":[{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":0},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":1},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":2},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":3},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":4},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":5},{"bias":0,"type":"input","squash":"LOGISTIC","mask":1,"index":6},{"bias":-0.002182263383433747,"type":"output","squash":"HARD_TANH","mask":1,"index":7},{"bias":0.11164399302344519,"type":"output","squash":"TANH","mask":1,"index":8},{"bias":0.3946696515306427,"type":"output","squash":"BIPOLAR","mask":1,"index":9},{"bias":-1.9675416065208684,"type":"output","squash":"LOGISTIC","mask":1,"index":10}],"connections":[{"weight":1.4444255802930197,"from":6,"to":10,"gater":null},{"weight":1.84098502887657,"from":6,"to":9,"gater":null},{"weight":0.27314651537781776,"from":4,"to":10,"gater":null},{"weight":0.5161417147891203,"from":5,"to":9,"gater":null},{"weight":-2.283154507005471,"from":6,"to":8,"gater":null},{"weight":-0.06369672503802506,"from":3,"to":10,"gater":null},{"weight":0.40486846192268944,"from":4,"to":9,"gater":null},{"weight":0.01565054218632969,"from":5,"to":8,"gater":null},{"weight":1.359840948785072,"from":6,"to":7,"gater":null},{"weight":-1.4852758942702522,"from":2,"to":10,"gater":null},{"weight":-0.08795071403887685,"from":3,"to":9,"gater":null},{"weight":0.38648153351658454,"from":4,"to":8,"gater":null},{"weight":1.1047183709196673,"from":5,"to":7,"gater":null},{"weight":1.0121444323508886,"from":1,"to":10,"gater":null},{"weight":2.0130159944667274,"from":2,"to":9,"gater":null},{"weight":-0.06369672503802506,"from":3,"to":8,"gater":null},{"weight":0.49787368561382284,"from":4,"to":7,"gater":null},{"weight":0.014350026383921438,"from":0,"to":10,"gater":null},{"weight":-3.639448281995533,"from":1,"to":9,"gater":null},{"weight":0.0900884263230664,"from":2,"to":8,"gater":null},{"weight":-0.04925336310544784,"from":3,"to":7,"gater":null},{"weight":-2.051265477268143,"from":0,"to":9,"gater":null},{"weight":0.11226243284851256,"from":1,"to":8,"gater":null},{"weight":0.573953785917861,"from":2,"to":7,"gater":null},{"weight":-1.971060959861913,"from":0,"to":8,"gater":null},{"weight":-8.346346865781152,"from":1,"to":7,"gater":null},{"weight":-3.518089214285725,"from":0,"to":7,"gater":null}],"input":7,"output":4,"dropout":0}'
// let net_e = 
//   '{"nodes":[{"bias":0.0025992893955651686,"type":"input","squash":"TANH","mask":1,"index":0},{"bias":0.004415518231104712,"type":"input","squash":"TANH","mask":1,"index":1},{"bias":-0.04493647479764165,"type":"input","squash":"TANH","mask":1,"index":2},{"bias":-0.07804262230947533,"type":"input","squash":"TANH","mask":1,"index":3},{"bias":0.06258297941396354,"type":"input","squash":"TANH","mask":1,"index":4},{"bias":0.05814060814263486,"type":"input","squash":"TANH","mask":1,"index":5},{"bias":-0.03678735030932523,"type":"input","squash":"TANH","mask":1,"index":6},{"bias":-0.006297489592269834,"type":"hidden","squash":"TANH","mask":1,"index":7},{"bias":-0.30790114710312344,"type":"hidden","squash":"TANH","mask":1,"index":8},{"bias":-2.1571629125121645,"type":"hidden","squash":"TANH","mask":1,"index":9},{"bias":3.6604176211189023,"type":"hidden","squash":"TANH","mask":1,"index":10},{"bias":-0.8371230421624589,"type":"hidden","squash":"TANH","mask":1,"index":11},{"bias":0.06486647303881893,"type":"hidden","squash":"TANH","mask":1,"index":12},{"bias":-3.9579918858951726,"type":"hidden","squash":"TANH","mask":1,"index":13},{"bias":-0.06152143098504559,"type":"hidden","squash":"TANH","mask":1,"index":14},{"bias":0.3226273293194631,"type":"hidden","squash":"TANH","mask":1,"index":15},{"bias":-0.26888442328237977,"type":"hidden","squash":"TANH","mask":1,"index":16},{"bias":1.3866650293173723,"type":"hidden","squash":"TANH","mask":1,"index":17},{"bias":0.20574648266466178,"type":"hidden","squash":"TANH","mask":1,"index":18},{"bias":-1.767286403551545,"type":"hidden","squash":"TANH","mask":1,"index":19},{"bias":0.010951805433579806,"type":"hidden","squash":"TANH","mask":1,"index":20},{"bias":-0.3971689203852319,"type":"hidden","squash":"TANH","mask":1,"index":21},{"bias":1.4156327953929688,"type":"hidden","squash":"TANH","mask":1,"index":22},{"bias":-1.067918237359053,"type":"hidden","squash":"TANH","mask":1,"index":23},{"bias":-0.32735700124696177,"type":"hidden","squash":"TANH","mask":1,"index":24},{"bias":-0.08939628124203353,"type":"output","squash":"TANH","mask":1,"index":25},{"bias":0.004973339266292509,"type":"output","squash":"TANH","mask":1,"index":26},{"bias":-0.09848235455032373,"type":"output","squash":"TANH","mask":1,"index":27},{"bias":-0.12299912732261786,"type":"output","squash":"TANH","mask":1,"index":28}],"connections":[{"weight":0.9911420160693984,"from":24,"to":28,"gater":null},{"weight":-0.024996550512290355,"from":23,"to":28,"gater":null},{"weight":0.058947651774206994,"from":24,"to":27,"gater":null},{"weight":-0.006364234233738483,"from":22,"to":28,"gater":null},{"weight":0.050939558020733106,"from":23,"to":27,"gater":null},{"weight":-1.0942227887147322,"from":24,"to":26,"gater":null},{"weight":0.019306641336691216,"from":21,"to":28,"gater":null},{"weight":0.07495756365960454,"from":22,"to":27,"gater":null},{"weight":-0.279345905974936,"from":23,"to":26,"gater":null},{"weight":0.09419299289134667,"from":24,"to":25,"gater":null},{"weight":-0.047332122349965956,"from":20,"to":28,"gater":null},{"weight":0.07853114120416166,"from":21,"to":27,"gater":null},{"weight":-0.09402841200947779,"from":22,"to":26,"gater":null},{"weight":0.056726997040155436,"from":23,"to":25,"gater":null},{"weight":-0.0965665088107314,"from":19,"to":28,"gater":null},{"weight":0.8878369665832658,"from":20,"to":27,"gater":null},{"weight":-0.06275379458785993,"from":21,"to":26,"gater":null},{"weight":0.032194016869739606,"from":22,"to":25,"gater":null},{"weight":-0.08781584433967199,"from":18,"to":28,"gater":null},{"weight":0.013444366482855893,"from":19,"to":27,"gater":null},{"weight":0.09085547154845278,"from":20,"to":26,"gater":null},{"weight":0.07517899890785112,"from":21,"to":25,"gater":null},{"weight":-0.04991573456906276,"from":17,"to":28,"gater":null},{"weight":0.044974467982669436,"from":18,"to":27,"gater":null},{"weight":-0.02907995023889165,"from":19,"to":26,"gater":null},{"weight":0.7471065485957501,"from":20,"to":25,"gater":null},{"weight":0.09448130516314648,"from":16,"to":28,"gater":null},{"weight":-0.0712756444432309,"from":17,"to":27,"gater":null},{"weight":0.030340018366820376,"from":18,"to":26,"gater":null},{"weight":0.04282975192078889,"from":19,"to":25,"gater":null},{"weight":-0.023056714456967775,"from":16,"to":27,"gater":null},{"weight":0.07032162328790159,"from":17,"to":26,"gater":null},{"weight":-0.007677489837203663,"from":18,"to":25,"gater":null},{"weight":0.07798834165028473,"from":16,"to":26,"gater":null},{"weight":-0.008261135963562177,"from":17,"to":25,"gater":null},{"weight":0.03717679419952394,"from":16,"to":25,"gater":null},{"weight":3.2074613671940093,"from":15,"to":24,"gater":null},{"weight":-0.03284705390703335,"from":14,"to":24,"gater":null},{"weight":-0.2792313307266751,"from":15,"to":23,"gater":null},{"weight":0.3011798741012952,"from":13,"to":24,"gater":null},{"weight":0.029758229032802494,"from":14,"to":23,"gater":null},{"weight":1.84817437081286,"from":15,"to":22,"gater":null},{"weight":0.18082524361982483,"from":12,"to":24,"gater":null},{"weight":-0.4512179679030648,"from":13,"to":23,"gater":null},{"weight":1.7794429873595727,"from":14,"to":22,"gater":null},{"weight":0.06817352794183532,"from":15,"to":21,"gater":null},{"weight":0.4627964350690893,"from":11,"to":24,"gater":null},{"weight":0.07112762576036169,"from":12,"to":23,"gater":null},{"weight":0.6208956626479012,"from":13,"to":22,"gater":null},{"weight":1.8318466618497946,"from":14,"to":21,"gater":null},{"weight":-0.043558279236482506,"from":15,"to":20,"gater":null},{"weight":0.009565246775474143,"from":10,"to":24,"gater":null},{"weight":-0.07409117920237063,"from":11,"to":23,"gater":null},{"weight":-1.4367194302215356,"from":12,"to":22,"gater":null},{"weight":0.7928744169519909,"from":13,"to":21,"gater":null},{"weight":0.029063392283808304,"from":14,"to":20,"gater":null},{"weight":2.3583343304365827,"from":15,"to":19,"gater":null},{"weight":-0.03867016125746994,"from":9,"to":24,"gater":null},{"weight":0.08428745121025076,"from":10,"to":23,"gater":null},{"weight":0.3265859408458737,"from":11,"to":22,"gater":null},{"weight":0.9175866663958892,"from":12,"to":21,"gater":null},{"weight":0.09006806708161438,"from":13,"to":20,"gater":null},{"weight":0.15650310080744423,"from":14,"to":19,"gater":null},{"weight":0.5163615128067625,"from":15,"to":18,"gater":null},{"weight":-0.5562923226289478,"from":8,"to":24,"gater":null},{"weight":0.022017621225508238,"from":9,"to":23,"gater":null},{"weight":-0.7661886342655375,"from":10,"to":22,"gater":null},{"weight":-0.686248555736343,"from":11,"to":21,"gater":null},{"weight":-0.07034994850694704,"from":12,"to":20,"gater":null},{"weight":0.11498697699829993,"from":13,"to":19,"gater":null},{"weight":-0.1736880656373277,"from":14,"to":18,"gater":null},{"weight":-0.8364765561057166,"from":15,"to":17,"gater":null},{"weight":-0.4187727550922161,"from":7,"to":24,"gater":null},{"weight":0.03123630043382128,"from":8,"to":23,"gater":null},{"weight":-0.8898612895697069,"from":9,"to":22,"gater":null},{"weight":0.02795515442614152,"from":10,"to":21,"gater":null},{"weight":-0.020836423265618104,"from":11,"to":20,"gater":null},{"weight":0.1362606033566894,"from":12,"to":19,"gater":null},{"weight":0.08737494125371237,"from":13,"to":18,"gater":null},{"weight":0.11859765456701302,"from":14,"to":17,"gater":null},{"weight":0.16197532077101195,"from":15,"to":16,"gater":null},{"weight":-0.23542976143031327,"from":7,"to":23,"gater":null},{"weight":0.18409382108150318,"from":8,"to":22,"gater":null},{"weight":0.017855000572604862,"from":9,"to":21,"gater":null},{"weight":-0.03346525161440468,"from":10,"to":20,"gater":null},{"weight":-0.1811178526449726,"from":11,"to":19,"gater":null},{"weight":-0.8608495829219034,"from":12,"to":18,"gater":null},{"weight":0.3737421989921756,"from":13,"to":17,"gater":null},{"weight":0.4638042024563345,"from":14,"to":16,"gater":null},{"weight":0.30314405450604553,"from":7,"to":22,"gater":null},{"weight":-0.017299000879340914,"from":8,"to":21,"gater":null},{"weight":0.041467940859833824,"from":9,"to":20,"gater":null},{"weight":0.3539479499602258,"from":10,"to":19,"gater":null},{"weight":-0.027251092482542608,"from":11,"to":18,"gater":null},{"weight":0.17187645500953916,"from":12,"to":17,"gater":null},{"weight":0.03516935850776853,"from":13,"to":16,"gater":null},{"weight":-1.702552722997397,"from":7,"to":21,"gater":null},{"weight":0.05180296733076886,"from":8,"to":20,"gater":null},{"weight":1.0101541000239833,"from":9,"to":19,"gater":null},{"weight":-0.09015028052664151,"from":10,"to":18,"gater":null},{"weight":0.208837429379047,"from":11,"to":17,"gater":null},{"weight":0.1551777664737471,"from":12,"to":16,"gater":null},{"weight":-0.24455476456480643,"from":7,"to":20,"gater":null},{"weight":0.7380419708397088,"from":8,"to":19,"gater":null},{"weight":-0.01834898263319551,"from":9,"to":18,"gater":null},{"weight":-0.273402496204217,"from":10,"to":17,"gater":null},{"weight":0.0804442027899793,"from":11,"to":16,"gater":null},{"weight":0.6311010440817804,"from":7,"to":19,"gater":null},{"weight":-0.08455856734535674,"from":8,"to":18,"gater":null},{"weight":0.10579168217892493,"from":9,"to":17,"gater":null},{"weight":0.0403759079018271,"from":10,"to":16,"gater":null},{"weight":0.050274140575601534,"from":7,"to":18,"gater":null},{"weight":0.34233074401436264,"from":8,"to":17,"gater":null},{"weight":0.006886207270354119,"from":9,"to":16,"gater":null},{"weight":0.20504698647952374,"from":7,"to":17,"gater":null},{"weight":0.08983166172821938,"from":8,"to":16,"gater":null},{"weight":-0.5757042758677189,"from":7,"to":16,"gater":null},{"weight":-0.034232387313629986,"from":6,"to":15,"gater":null},{"weight":0.22395547942894778,"from":5,"to":15,"gater":null},{"weight":2.2067134842808374,"from":6,"to":14,"gater":null},{"weight":-0.5695553908625777,"from":4,"to":15,"gater":null},{"weight":1.2032269051561444,"from":5,"to":14,"gater":null},{"weight":-0.9554963950908226,"from":6,"to":13,"gater":null},{"weight":0.02788938658874085,"from":3,"to":15,"gater":null},{"weight":0.1804830660594795,"from":4,"to":14,"gater":null},{"weight":0.5806413068756903,"from":5,"to":13,"gater":null},{"weight":-0.9274247205492157,"from":6,"to":12,"gater":null},{"weight":-0.8796783029698737,"from":2,"to":15,"gater":null},{"weight":0.023425097359262015,"from":3,"to":14,"gater":null},{"weight":-0.5542252461727368,"from":4,"to":13,"gater":null},{"weight":-0.1585606318764916,"from":5,"to":12,"gater":null},{"weight":0.8868635882693813,"from":6,"to":11,"gater":null},{"weight":-0.8474753763285738,"from":1,"to":15,"gater":null},{"weight":0.6341410840546631,"from":2,"to":14,"gater":null},{"weight":-1.0256779386955834,"from":3,"to":13,"gater":null},{"weight":-0.2706145180771635,"from":4,"to":12,"gater":null},{"weight":-0.5156118827415204,"from":5,"to":11,"gater":null},{"weight":-1.7807620069768308,"from":6,"to":10,"gater":null},{"weight":1.7962858282055665,"from":0,"to":15,"gater":null},{"weight":-4.272897534829898,"from":1,"to":14,"gater":null},{"weight":0.0006622310404814646,"from":2,"to":13,"gater":null},{"weight":0.8418168045525544,"from":3,"to":12,"gater":null},{"weight":0.7464709277056767,"from":4,"to":11,"gater":null},{"weight":-0.27200481843142094,"from":5,"to":10,"gater":null},{"weight":0.7867457359309289,"from":6,"to":9,"gater":null},{"weight":-0.09026297053812338,"from":0,"to":14,"gater":null},{"weight":0.8877808242290539,"from":1,"to":13,"gater":null},{"weight":-2.3916018426752963,"from":2,"to":12,"gater":null},{"weight":0.07213558138463924,"from":3,"to":11,"gater":null},{"weight":0.2809159618890599,"from":4,"to":10,"gater":null},{"weight":-0.35434485537652216,"from":5,"to":9,"gater":null},{"weight":0.1676687264245858,"from":6,"to":8,"gater":null},{"weight":-0.35722423795251146,"from":0,"to":13,"gater":null},{"weight":0.024461393973489454,"from":1,"to":12,"gater":null},{"weight":-0.16435074208497413,"from":2,"to":11,"gater":null},{"weight":-1.172227024991721,"from":3,"to":10,"gater":null},{"weight":-0.0367875483737099,"from":4,"to":9,"gater":null},{"weight":1.3645862196338585,"from":5,"to":8,"gater":null},{"weight":-0.4866882242713849,"from":6,"to":7,"gater":null},{"weight":-0.22820957092162908,"from":0,"to":12,"gater":null},{"weight":5.645303103610811,"from":1,"to":11,"gater":null},{"weight":-0.7217951200789536,"from":2,"to":10,"gater":null},{"weight":-1.3097139416627868,"from":3,"to":9,"gater":null},{"weight":-0.6149519124497689,"from":4,"to":8,"gater":null},{"weight":-0.12258877143344545,"from":5,"to":7,"gater":null},{"weight":1.8782080512987216,"from":0,"to":11,"gater":null},{"weight":1.9990316416386964,"from":1,"to":10,"gater":null},{"weight":0.8820604780043635,"from":2,"to":9,"gater":null},{"weight":-0.04736270356054173,"from":3,"to":8,"gater":null},{"weight":-0.09137345580516856,"from":4,"to":7,"gater":null},{"weight":0.30778213175544034,"from":0,"to":10,"gater":null},{"weight":-0.043602086268533395,"from":1,"to":9,"gater":null},{"weight":-0.24764431631986272,"from":2,"to":8,"gater":null},{"weight":-0.009918433973556656,"from":3,"to":7,"gater":null},{"weight":-1.5088134161872548,"from":0,"to":9,"gater":null},{"weight":-2.7619728929684246,"from":1,"to":8,"gater":null},{"weight":0.19111373132454984,"from":2,"to":7,"gater":null},{"weight":-5.812520372929042,"from":0,"to":8,"gater":null},{"weight":1.267093609331806,"from":1,"to":7,"gater":null},{"weight":-0.002949558539219105,"from":0,"to":7,"gater":null}],"input":7,"output":4,"dropout":0}'

let network = net_c

let targets = []
let bestNet = neataptic.Network.fromJSON(JSON.parse(network))
let drone
let selection;
let smokeOn;
let ticksper

function setup() {
  createCanvas(window.innerWidth-100, window.innerHeight-100)
  smoke.resize(50, 50)
  frameRate(144)
  targets = []
  for (let i = 0; i < 200; i++) {
    let t = createVector(width / 2, height / 2)
    while (dist(width / 2, height / 2, t.x, t.y) < 200)
      t = createVector(random(100, width - 100), random(100, height - 100))
    targets.push(t)
  }
  targets[0] = createVector(width / 2, height / 2)
  drone = new Drone(width / 2, height / 2, bestNet, targets)
  //Graph
  let g = document.createElement('div');
  g.setAttribute("id", "vis2");
  document.body.appendChild(g)
  graph(bestNet)
  selection = createSelect()
  smokeOn = createSelect()
  ticksper = createSelect()
  smokeOn.position(150, height+10)
  ticksper.position(290, height+10)
  ticksper.option("1 tick per frame")
  ticksper.option("2 ticks per frame")
  ticksper.option("5 ticks per frame")
  ticksper.option("10 ticks per frame")
  ticksper.option("50 ticks per frame")
  
  smokeOn.option("Smoke On")
  smokeOn.option("Smoke Off")
  smokeOn.changed(function(){
    
  })
  selection.position(10, height+10)
  selection.option("Network 1")
  selection.option("Network 2")
  selection.option("Network 3")
  //selection.option("Network 4")

  selection.changed(function(){
    if (selection.value() == "Network 1")
      network = net_c
    if (selection.value() == "Network 2")
      network = net_b
    if (selection.value() == "Network 3")
      network = net_a
    if (selection.value() == "Network 4")
      network = net_d
    bestNet = neataptic.Network.fromJSON(JSON.parse(network))
    graph(bestNet)
    drone = new Drone(width / 2, height / 2, bestNet, targets)
  })
}
let ticker = 1
let dt = 0.008
let angle = 0

function softmax(arr) {
  return arr.map(function(value, index) {
    return Math.exp(value) / arr.map(function(y /*value*/) { return Math.exp(y) }).reduce(function(a, b) { return a + b })
  })
}

function draw() {
  background(0)
  if (ticksper.value() == "1 tick per frame")
    ticker = 1
  if (ticksper.value() == "2 ticks per frame")
    ticker = 2
  if (ticksper.value() == "5 ticks per frame")
    ticker = 5
  if (ticksper.value() == "10 ticks per frame")
    ticker = 10
  if (ticksper.value() == "20 ticks per frame")
    ticker = 20
  
  if (smokeOn.value() == "Smoke On")
      drone.smoke_mode = 0
  else
    drone.smoke_mode = 1
  if (Math.abs(drone.angle) > Math.PI)
    drone = new Drone(width / 2, height / 2, bestNet, targets)
  for (let i = 0; i < ticker; i++) {
    //drone.targets[0] = createVector(Math.cos(angle)*300+width/2, Math.sin(angle)*300+height/2)
    drone.targets[0] = createVector(mouseX, mouseY)
    // drone.left.setPower(0.142)
    // drone.right.setPower(0.142)
    drone.update(dt)
    angle += 0.005
  }


  // drone2.update2(dt)
  // drone2.show()
  let inputs = drone.getInputs(dt)
  let inputs_weightage = [1, 1, 1, 1, 3, 3, 0.5]
  let texts = ["To Target X",
    "To Target Y",
    "sin of angle",
    "cos of angle",
    "velocity x",
    "velocity y",
    "angular velocity"]
  for (let i = 0; i < 7; i++) {
    push()
    let val = map(inputs[i], -
      inputs_weightage[i],
      inputs_weightage[i],
      0, 255)
    fill(255 - val,
      val,
      0)
    circle(200, height - 7 * 40 + i * 40, 20)
    fill(255)
    text(texts[i] + ":" + Math.round(inputs[i] * 100) / 100, 50, height - 7 * 40 + i * 40)
    pop()
  }
  let output_weightage = [1, Math.PI/2, 1, Math.PI/2]
  let texts_outs = [
    "Left Thruster Power",
    "Left Thruster Angle",
    "Right Thruster Power",
    "Right Thruster Angle",]
    for (let i = 0; i < 4; i++) {
    push()
    let val = map(drone.outs[i], -
      output_weightage[i],
      output_weightage[i],
      0, 255)
    fill(255 - val,
      val,
      0)
    circle(300, height - 5.5 * 40 + i * 40, 20)
    fill(255)
    text(texts_outs[i] + ":" + Math.round(drone.outs[i] * 100) / 100, 350, height - 5.5 * 40 + i * 40)
    pop()
  }
  push()
  fill(255)
  textAlign(CENTER)
  textSize(16)
  //text(drone.score, drone.pos.x, drone.pos.y - 50)
  pop()
  drone.show()
}