import { useState } from "react";

// Header component: page ka top section dikhata hai.
function Header() {
  return <header className="header"><div className="container nav"><h1>ComponentLab</h1><span>React Practice</span></div></header>;
}

// Button component props ke through text aur click action leta hai.
function Button({ children, onClick, secondary = false }) {
  return <button className={secondary ? "btn secondary" : "btn"} onClick={onClick}>{children}</button>;
}

// Card component ko title aur description props milte hain.
function Card({ title, description, icon }) {
  return <article className="card"><div className="icon">{icon}</div><h3>{title}</h3><p>{description}</p></article>;
}

function Footer() {
  return <footer className="footer">Made for React Components Practice</footer>;
}

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (name.trim()) setSubmittedName(name.trim());
  }

  const components = [
    { icon: "🧩", title: "Reusable Components", description: "Small UI parts can be reused across different pages." },
    { icon: "📦", title: "Props", description: "Props help send data from a parent component to a child component." },
    { icon: "🔄", title: "State", description: "State updates the interface when a value changes." }
  ];

  return <>
    <Header />
    <main className="container">
      <section className="intro"><p className="label">WEEK 1 · ASSIGNMENT 2</p><h2>Learning React, one component at a time.</h2><p>This small page demonstrates components, props, state, dynamic rendering, and a form.</p></section>
      <section className="cards">{components.map((item) => <Card key={item.title} {...item} />)}</section>

      <section className="panel">
        <div><p className="label">STATE DEMO</p><h2>Button Click Counter</h2><p>Current count: <strong>{count}</strong></p></div>
        <div className="actions"><Button onClick={() => setCount(count + 1)}>Add one</Button><Button secondary onClick={() => setCount(0)}>Reset</Button></div>
      </section>

      <section className="panel form-panel">
        <div><p className="label">FORM COMPONENT</p><h2>Say hello</h2><p>Enter a name to see the submitted value on the page.</p></div>
        <form onSubmit={handleSubmit} className="name-form">
          <label htmlFor="visitorName">Your name</label>
          <input id="visitorName" value={name} onChange={(event) => setName(event.target.value)} placeholder="Type your name" />
          <Button>Submit</Button>
          {submittedName && <p className="success">Hello, {submittedName}! Nice to meet you.</p>}
        </form>
      </section>
    </main>
    <Footer />
  </>;
}

export default App;
