import React, { useEffect, useState } from "react";

const css = {
  fontSize: "12px",
};

function CarsFuuel(props) {
  /**
   * We should use inline styles.
   * It's a bad practice and hard to debug later.
   * Make it by the className and use our styled preprocessor.
   *
   * Second thing is the h1 tag and changing it fontSize - better way is use <strong /> - H1 is reserved for some important header
   */
  return <h1 style={css}>Car's fuel consumed: {props.children}</h1>;
}

function Alert(props) {
  const fuel = props.fuel;
  const [state, setState] = useState(0);

  useEffect(() => {
    if (fuel > 1200) {
      setState(1);
    }
    /**
     * missing dependency! this useEffect is unusable. For now is refreshing always when it's state will change.
     * Below line should looks `}, [fuel]);`
     * but to be honest in this component you could use useMemo instead useEffect like below:
     * const state = useMemo(() => fuel > 1200 ? 1 : 0, [fuel]);
     * But the best way is wrap this component by React.memo - https://en.reactjs.org/docs/react-api.html#reactmemo
     */
  });

  if (state) {
    /**
     * Use className and css preprocessor
     */
    return <h2 style={{ color: "red" }}>Alert</h2>;
    // this else is redundant.
  } else {
    return <h2>All is fine</h2>;
  }
}

/**
 * You shouldn't mix React.Component and hook component.
 * Rewrite this one to hooks like Alert component
 */
class App extends React.Component {
  constructor(props) {
    super(props);

    // We declare the state
    this.state = {
      x: 1,
      f: 0,
    };
  }

  updateCoordinates() {
    /**
     * it's hard to reed. split it to separated lines:
       {
          x: prevState.x + 1,
          f: 1 + prevState.f + prevState.x * 10
        }
     */
    (prevState) => ({
      x: prevState.x + 1,
      f: 1 + prevState.f + prevState.x * 10,
    });
    // save interval to some reference and use clearInterval on unmount component!
    setInterval(() => {
      this.setState((prevState) => ({
        x: prevState.x + 1,
        f: 1 + prevState.f + prevState.x * 10,
      }));
    }, 1000);
  }

  componentDidMount() {
    this.updateCoordinates();
  }

  render() {
    /**
     * use destructure for state please:
     * const { x: x1, f: fuel } = this.state;
     */
    var x1 = this.state.x;
    var fuel = this.state.f;

    return (
      <div>
        <h1>Position - {x1}</h1>
        <CarsFuuel>{fuel}</CarsFuuel>
        <Alert fuel={fuel} />
      </div>
    );
  }
}

export default App;
