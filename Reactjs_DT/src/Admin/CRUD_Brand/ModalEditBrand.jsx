import React, { Component } from "react";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ModalEditProducts.scss";
import _ from "lodash";
import { Buffer } from "buffer";
import CommonUtils from "../../utils/CommonUtils";
import ImageUtility from "../Utility/ImageUtility";
import {validateInput} from "../Utility/CRUDUltility";
class ModalEditBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      avatar: "",
      previewImgURL: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    // cachs 2 //let {CurrentUser}=this.props;
    let imageBase64 = "";
    if (user.image) {
      // const imageBuffer = Buffer.from(JSON.stringify(user.image));
      imageBase64 = new Buffer.from(user.image, "base64").toString("binary");
    }
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        previewImgURL: imageBase64,
      });
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
    //good code
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        // console.log('check good state: ',this.state);
      }
    );
    //console.log('copystate: ',copyState);

    // console.log(event.target.value,id)
  };

  handleSaveUser = () => {
    let isValid = validateInput(["name"]);

    if (isValid == true) {
      this.props.editUser(this.state);
    }
  };
  
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"model-user-container"}
        size="lg"
        centered
      >
        <ModalHeader
          className="header-user-content"
          toggle={() => {
            this.toggle();
          }}
        >
          Sửa Hãng sản phẩm
        </ModalHeader>
        <ModalBody>
          <div className="user-redux-body">
            <div className="container center">
              <div className="row-12">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Tên Hãng sản phẩm</label>
                    <input
                      className="form-control"
                      placeholder="iphone"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "name");
                      }}
                      value={this.state.name}
                    />
                  </div>
                  <ImageUtility></ImageUtility>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            color="primary"
            className="px-3"
            onClick={() => {
              this.handleSaveUser();
            }}
          >
            Lưu thay đổi
          </Button>
          <Button
            variant="secondary"
            color="danger"
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            Đóng
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalEditBrand;
