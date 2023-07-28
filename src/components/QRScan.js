import React, { Component } from "react";
import QRCode from "react-qr-code";

class QRScan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      back: "#FFFFFF",
      fore: "#000000",
      size: 256,
    };
  }

  handleValueChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleBackChange = (e) => {
    this.setState({ back: e.target.value });
  };

  handleForeChange = (e) => {
    this.setState({ fore: e.target.value });
  };

  handleSizeChange = (e) => {
    this.setState({
      size: parseInt(e.target.value === "" ? 0 : e.target.value, 10),
    });
  };

  render() {
    const { value, back, fore, size } = this.state;

    return (
      <div className="QRScan">
        <center>
          <br />
          <br />
          <input
            type="text"
            onChange={this.handleValueChange}
            placeholder="Value of Qr-code"
          />
          <br />
          <br />
          <input
            type="text"
            onChange={this.handleBackChange}
            placeholder="Background color"
          />
          <br />
          <br />
          <input
            type="text"
            onChange={this.handleForeChange}
            placeholder="Foreground color"
          />
          <br />
          <br />
          <input
            type="number"
            onChange={this.handleSizeChange}
            placeholder="Size of Qr-code"
          />
          <p>Bàn số {localStorage && localStorage.getItem("table")}</p>
          <br />
          <br />
          <br />
          {value && (
            <QRCode
              title="GeeksForGeeks"
              value={value}
              bgColor={back}
              fgColor={fore}
              size={size === "" ? 0 : size}
            />
          )}
        </center>
      </div>
    );
  }
}

export default QRScan;
