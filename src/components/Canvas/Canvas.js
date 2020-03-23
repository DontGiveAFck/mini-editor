import React, { Component } from 'react';
import { connect } from 'react-redux'
import { cn } from '@bem-react/classname';
import { Button } from "react-bootstrap";
import { canvasSize } from '../../constants/common';

import './Canvas.scss';

const block = cn('Canvas');

const mapStateToProps = state => ({
  texts: state.imageEditor.textsOnCanvas,
});

class Canvas extends Component {
  canvasRef = React.createRef();

  componentDidMount() {
    const ctx = this.canvasRef.current.getContext("2d");
    this.clearCanvas(ctx);
  }

  clearCanvas = (ctx) => {
    // clear canvas
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
  };

  renderTexts = () => {
    const { texts } = this.props;

    if (this.canvasRef && this.canvasRef.current) {
      const ctx = this.canvasRef.current.getContext("2d");
      this.clearCanvas(ctx);

      // change text start position
      ctx.textAlign = "start";
      ctx.textBaseline = "top";

      // render texts from array
      texts.forEach(textObject => {
        const { text, fontSize, color, position: {x, y}, font } = textObject;
        ctx.font = `${fontSize}px "${font}"`;
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
      });
    }
  };

  onDownloadImageClick = () => {
    // create link element and click on it for downloading
    const link = document.createElement('a');
    link.download = 'image.png';
    link.href = this.canvasRef.current.toDataURL();
    link.click();
  };

  render() {
    this.renderTexts();
    return (
      <div>
        <canvas
          ref={this.canvasRef}
          className={block()}
          width={canvasSize.width}
          height={canvasSize.height}
        />
        <br/>
        <Button variant="light" onClick={this.onDownloadImageClick}>
          Download image
        </Button>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Canvas);
