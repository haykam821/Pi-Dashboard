const app = document.getElementById("app");

class DashItem {
	constructor(color, opts = {}) {
  	this.name = opts.name;
    this.customGetValue = opts.getValue;
    this.color = color || "blue";
  }
  
  getValue() {
  	if (typeof this.customGetValue === "function") {
    	return this.customGetValue();
    } else {
    	return ":(";
    }
  }
  
  render() {
 		return (<Card color={this.color} fluid>
      <Card.Content>
        <Card.Header>{this.getValue()}</Card.Header>
        <Card.Meta>{this.name}</Card.Meta>
      </Card.Content>
    </Card>)
  }
}
class DashSection {
	constructor(opts = {}) {
  	this.header = opts.header;
    this.color = opts.color;
    this.items = (opts.items || []).map(item => new DashItem(this.color, item));
  }
}

const {
  Card,
  Container,
  Header,
} = semanticUIReact;

function render() {
	const things = [
 	{
  	header: "Testing",
    color: "red",
    items: [{
    	name: "Cards Made",
      getValue: () => {
      	return Math.floor(Math.random() * 1000) + 1;
      }
    }, {
    	name: "Missing One!"
    }, {
    	name: "Missing Another One!"
    }]
  },
  {
  	header: "Some Other Testing",
    color: "green",
    items: [{
    	name: "Food for Thought",
      getValue: () => Date.now(),
    }],
  }
].map(d=>new DashSection(d));

  ReactDOM.render(
    React.createElement(Container, null, things.map(section => {
      return <Container>
          <Header style={{ marginTop: 24, marginBottom: 8 }}>{section.header}</Header>
          <Card.Group itemsPerRow={Math.min(section.items.length, 4)} children={section.items.map(item => item.render())}></Card.Group>
      </Container>
    })),
    app,
  );
}
render();

// simulate the updating when we'll have a server
setInterval(render, 1000)
