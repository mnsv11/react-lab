import React, { Component } from "react";
import "./about.scss";
import Header from "../header/header";
import * as ReactDOM from "react-dom";

class About extends Component {

    constructor(props) {
        super(props);
        this.padPos = 200;
        this.padBottom = 30;
        this.padSize = 60;
        this.ballSpeed = 5;
        this.ballBottomPos = 30;
        this.ballLeft = 240;
        this.nrOfBlock = 12;
        this.blocks = [];
        this.createBlock();
        let started = false;
        this.count  = 0;


        document.addEventListener("keypress", key => {
            if (key.keyCode === 115) {
                if (!started) {
                    this.setBallPos();
                    started = true;
                }
            }
        });

        this.onMouseMove = this.onMouseMove.bind(this);

    }

    render() {
        return (
            <div className="about">
                <Header title="About"/>
                <div className='about-content'>
                    <div className='about-content-gamePlan' onMouseMove={this.onMouseMove} ref='gamePlan'>
                        <div className='about-content-gamePlan-targetArea' id='targetArea' ref='targetArea'>
                            {
                                this.blocks.map(element => {
                                    return element;
                                })
                            }
                        </div>
                        <div className='ball' ref='ball'/>
                        <div className='about-content-gamePlan-pad' ref='pad'/>
                    </div>
                </div>
            </div>
        );
    }

    onMouseMove(e) {
        let rect = this.refs.gamePlan.getBoundingClientRect();
        let pos = e.clientX - rect.left;
        if(pos > this.padSize / 2 && pos < 800 - (this.padSize / 2)) {
            this.padPos = pos - (this.padSize / 2);
            this.refs.pad.style.left = (e.clientX - rect.left) - (this.padSize / 2) + 'px';
        }
    }

    setBallPos() {
        let moveUp = true;
        let moveLeft = true;
        let checkBlock = true;
        this.addedBlocks = document.getElementsByClassName('block');
        const interval = setInterval(() => {

            if (this.ballLeft + 12 < 800 && moveLeft) {
                this.refs.ball.style.left = (this.ballLeft += 1) + 'px';
            } else {
                moveLeft = false;
                this.refs.ball.style.left = (this.ballLeft -= 1) + 'px';
                if (this.ballLeft < 0) {
                    moveLeft = true;
                }
            }

            if(this.ballBottomPos < 390 && moveUp) {
                this.refs.ball.style.bottom = (this.ballBottomPos += 1) + 'px';

                moveUp = !this.checkBlock(this.ballBottomPos + 10, this.ballLeft + 6, 20)


            } else if (this.ballBottomPos > 0){
                moveUp = false;
                if (checkBlock) {
                    moveUp = this.checkBlock(this.ballBottomPos + 10, this.ballLeft + 6, 0);
                }
                this.refs.ball.style.bottom = (this.ballBottomPos -= 1) + 'px';
                if (this.ballBottomPos < this.padBottom && ((this.ballLeft + 6) > this.padPos && (this.ballLeft + 6) < (this.padPos + this.padSize))) {
                    moveUp = true;
                    checkBlock = true;
                }

                if ( this.ballBottomPos === 0) {
                    clearInterval(interval);
                }

                if(this.count === this.nrOfBlock) {
                    this.ballSpeed -= 1;
                    checkBlock = false;
                    this.count = 0;
                    this.blocks = [];
                    this.nrOfBlock += 12;
                    this.createBlock();
                    let targetArea = document.getElementById('targetArea');
                    ReactDOM.unmountComponentAtNode(this.refs.targetArea)
                    ReactDOM.render(this.blocks, targetArea);
                }
            }
        }, this.ballSpeed)
    }

    checkBlock(ballPosBottom, ballLeftPos, offset) {
        for (let i = 0; i < this.addedBlocks.length; i++) {
            if (ballPosBottom > (400 - this.addedBlocks[i].offsetTop) - offset && ballLeftPos > this.addedBlocks[i].offsetLeft && ballLeftPos < this.addedBlocks[i].offsetLeft + 60) {
                if(this.addedBlocks[i].style.visibility !== 'hidden') {
                    this.addedBlocks[i].style.visibility = 'hidden';
                    this.count++;
                    return true;
                }
            }
        }
        return false;
    }


    createBlock() {
        for (let i = 0; i < this.nrOfBlock; i++) {
            let color = 'rgb(' + this.rgb() + "," + this.rgb() + "," + this.rgb() + ')';
            this.blocks.push(<div key={i} className='block' style={{backgroundColor: color}}/>);
        }
    }

    rgb () { return Math.floor(Math.random() * 255) }

}


export default About;