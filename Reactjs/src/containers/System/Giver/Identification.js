import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { CommonUtils } from "../../../utils";
import moment from "moment";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import Header from "../../Header/Giver/Header";
import Banner from "../../Banner/Banner";
import Footer from "../../Footer/Footer";
import ScrollUp from "../../../components/ScrollUp";
import "./News.scss";
import * as ml5 from "ml5";
import loadImage from "p5";
import anh from "../../../assets/images/chainhua4.jpg";
import * as tf from "@tensorflow/tfjs";

class Identification extends Component {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
    this.state = {
      model: null,
      imageURL: null,
      imgBase64: null,
    };
    this.gotResults = this.gotResults.bind(this);
  }

  componentDidMount() {
    this.loadModel();
    this.gotResults();
  }

  loadModel = async () => {
    let classifier;
    let modelURL = "https://teachablemachine.withgoogle.com/models/tHyfe9Pfn/";
    // let modelURL = "../../Model/model.json";
    classifier = await ml5.imageClassifier(modelURL + "model.json");
    this.setState({
      model: classifier,
    });
    console.log("modelURL", this.state.model);
  };

  // loadModel = async () => {
  //   let classifier;
  //   // let modelURL = "https://teachablemachine.withgoogle.com/models/tHyfe9Pfn/";
  //   // let modelURL = "../../Model/model.json";
  //   classifier = await ml5.imageClassifier("MobileNet");

  //   this.setState({
  //     model: classifier,
  //   });
  //   console.log("modelURL", this.state.model);
  // };

  uploadImage = async (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      let base64 = await CommonUtils.getBase64(files[0]);
      const url = URL.createObjectURL(files[0]);
      this.setState(
        {
          imgBase64: base64,
          imageURL: url,
        },
        () => {
          console.log("imageURL", this.state.imgBase64);
        }
      );
    } else {
      this.setState({
        imageURL: null,
      });
    }
  };

  identifyImage = (e) => {
    let image;
    let model = this.state.model;
    // let img = loadImage(this.state.imageURL);
    // console.log("img", img);

    // let results = model.classify(img, this.gotResults);
    // console.log("h", results);
  };

  gotResults = (err, results) => {
    if (err) {
      console.error(err);
    }
    if (results && results[0]) {
      console.log("#result", results[0].label);
      console.log("#confidence", results[0].confidence);
    }
  };

  //   classifyImage = () => {
  //     classifier.classify(image, gotResults);
  //   };

  //   identify = async () => {
  //     let results = await model.classify(imageRef.current);
  //     this.setState({
  //       results: results,
  //     });
  //   };

  render() {
    return (
      <>
        <div className="identify-image">
          <div className="wrapper row">
            <input type="file" onChange={(e) => this.uploadImage(e)}></input>
            <div className="preview-img-container">
              <input
                id="previewImg"
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => this.uploadImage(e)}
              ></input>
              {/* <label className="upload-file" htmlFor="previewImg">
              Tải ảnh <HiIcons.HiOutnlineCamera className="icon" />
            </label> */}
              <div className="preview-image">
                <img src={this.state.imageURL} />
              </div>
            </div>
          </div>
          <div className="wrapper row">
            <button className="" onClick={(e) => this.identifyImage(e)}>
              Nhận dạng
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // news: state.news.News,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getAllNews: (id) => dispatch(actions.getAllNews(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Identification)
);

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { withRouter } from "react-router";
// import { CommonUtils } from "../../../utils";
// import moment from "moment";
// import * as BiIcons from "react-icons/bi";
// import * as BsIcons from "react-icons/bs";
// import Header from "../../Header/Giver/Header";
// import Banner from "../../Banner/Banner";
// import Footer from "../../Footer/Footer";
// import ScrollUp from "../../../components/ScrollUp";
// import "./News.scss";
// import * as ml5 from "ml5";
// import loadImage from "p5";
// import { model } from "../../Model/model.json";
// import anh from "../../../assets/images/chainhua4.jpg";
// import * as Canvas from "canvas";

// class Identification extends Component {
//   constructor(props) {
//     super(props);
//     this.imageRef = React.createRef();
//     this.state = {};
//   }

//   componentDidMount() {
//     this.preload();
//   }

//   preload = async () => {
//     let classifier;
//     let modelURL = "https://teachablemachine.withgoogle.com/models/tHyfe9Pfn/";
//     // let modelURL = "../../Model/model.json";
//     classifier = await ml5.imageClassifier(modelURL + "model.json");
//     this.setState({
//       model: classifier,
//     });
//     console.log("modelURL", this.state.model);
//   };

//   setup = () => {
//     Canvas.default.createCanvas(320, 260);
//     // Create the video
//     video = createCapture(VIDEO);
//     video.size(320, 240);
//     video.hide();

//     flippedVideo = ml5.flipImage(video);
//     // Start classifying
//     classifyVideo();
//   };

//   draw = () => {
//     background(0);
//     // Draw the video
//     image(flippedVideo, 0, 0);

//     // Draw the label
//     fill(255);
//     textSize(16);
//     textAlign(CENTER);
//     text(label, width / 2, height - 4);
//   };

//   // loadModel = async () => {
//   //   let classifier;
//   //   // let modelURL = "https://teachablemachine.withgoogle.com/models/tHyfe9Pfn/";
//   //   // let modelURL = "../../Model/model.json";
//   //   classifier = await ml5.imageClassifier("MobileNet");

//   //   this.setState({
//   //     model: classifier,
//   //   });
//   //   console.log("modelURL", this.state.model);
//   // };

//   classifyVideo = () => {
//     flippedVideo = ml5.flipImage(video);
//     classifier.classify(flippedVideo, gotResult);
//     flippedVideo.remove();
//   };

//   gotResult = (error, results) => {
//     // If there is an error
//     if (error) {
//       console.error(error);
//       return;
//     }
//     // The results are in an array ordered by confidence.
//     // console.log(results[0]);
//     label = results[0].label;
//     // Classifiy again!
//     classifyVideo();
//   };

//   render() {
//     return (
//       <>
//         <div className="identify-image">
//           <div className="wrapper row">
//             <input type="file" onChange={(e) => this.uploadImage(e)}></input>
//             <div className="preview-img-container">
//               <input
//                 id="previewImg"
//                 type="file"
//                 accept="image/*"
//                 hidden
//                 onChange={(e) => this.uploadImage(e)}
//               ></input>
//               {/* <label className="upload-file" htmlFor="previewImg">
//               Tải ảnh <HiIcons.HiOutnlineCamera className="icon" />
//             </label> */}
//               <div className="preview-image">
//                 <img src={this.state.imageURL} />
//               </div>
//             </div>
//           </div>
//           <div className="wrapper row">
//             <button className="" onClick={(e) => this.identifyImage(e)}>
//               Nhận dạng
//             </button>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     // news: state.news.News,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // getAllNews: (id) => dispatch(actions.getAllNews(id)),
//   };
// };

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(Identification)
// );
