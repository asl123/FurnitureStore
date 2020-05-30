import React, { Component } from "react";
class LeftPanel extends Component {
  handleChange = (e) => {
    const { currentTarget: input } = e;
    const { categoryRadio } = this.props;
    console.log(input.name, input.value);
    categoryRadio.selected = input.value;
    this.props.onOptionChange(categoryRadio);
  };
  render() {
    const { categoryRadio } = this.props;
    console.log(categoryRadio);
    return (
      <div>
        <form>
          <ul className="list-group">
            <li className="list-group-item">
              <h4>Options</h4>
            </li>
            {categoryRadio.array.map((item) => (
              <li className="list-group-item border bg-light" key={item}>
                <input
                  value={item}
                  onChange={this.handleChange}
                  id={item}
                  name="category"
                  type="radio"
                  checked={item === categoryRadio.selected}
                  className="form-check-input"
                />
                <label htmlFor={item}>{item}</label>
              </li>
            ))}
          </ul>
        </form>
      </div>
    );
  }
}

export default LeftPanel;
