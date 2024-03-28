import React, { Component } from "react";
import { emitter } from "../../utils/emitter";
import _ from "lodash";
import CommonUtils from "../../utils/CommonUtils";

class ImageUtility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      avatar: "",
      previewImgURL: " ",
    };
    this.listenToEmitter();
  }
  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      //reset state
      this.setState({
        name: "",
        avatar: "",
        previewImgURL: " ",
      });
    });
  };
  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };
  render() {
    return (
      <div className="form-group col-md-3">
        <label>Hình ảnh</label>
        <div className="lamdep">
          <input
            type="file"
            id="previewImg"
            hidden
            onChange={(event) => this.handleOnChangeImage(event)}
          ></input>

          <label className="label-upload" htmlFor="previewImg">
            tải ảnh <i className="fas fa-upload"></i>
          </label>
          <div
            className="preview-image"
            onClick={this.handleImageClick}
            style={{
              backgroundImage: `url(${this.state.previewImgURL})`,
            }}
          ></div>
        </div>
      </div>
    );
  }
}

export default ImageUtility;
