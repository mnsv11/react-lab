import React, { Component } from "react";
import './expandItem.scss'
import PropTypes from 'prop-types';

class ExpandItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            items: props.items
        };
        this.maxheight = 0;
        this.countChildren(props.items);
        this.setHeight = this.setHeight.bind(this);
    }

    render() {
        return (
            <div className="expandItem" ref="expandItem">
                <div className="expandItem-content" onClick={this.setHeight}>
                    <div>{this.state.items.name}</div>
                    <div>{this.state.items.value}</div>
                </div>
                <CreateChild items={this.state.items} />
            </div>
        );
    }

    setHeight() {
        if (!this.refs.expandItem.style.maxHeight || this.refs.expandItem.style.maxHeight === '80px') {
            this.refs.expandItem.style.maxHeight =  80 * this.maxheight + "px";
        } else {
            this.refs.expandItem.style.maxHeight = '80px';
        }
    }

    countChildren(child) {
        this.maxheight++;
        if(child.child) {
            this.countChildren(child.child);
        }
    }
}

/**
 * @return {null}
 */
function CreateChild (items) {

    if(items.items.child) {
        return <div className='expandItem-child'><ExpandItem items={items.items.child}/></div>
    }
    return null
}

ExpandItem.propTypes = {
    items: PropTypes.object.isRequired
};

export default ExpandItem;