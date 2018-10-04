import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
const KeyCodes = {
    comma: 188,
    enter: 13,
  };
   
const delimiters = [KeyCodes.comma, KeyCodes.enter];

class TagSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            suggestions: [
                { id: 'Action', text: 'Action' },
                { id: 'Arcade', text: 'Arcade' },
                { id: 'Shooter', text: 'Shooter' },
            ]
        };
        // this.handleDelete = this.handleDelete.bind(this);
        // this.handleAddition = this.handleAddition.bind(this);
        // this.handleDrag = this.handleDrag.bind(this);
    }



    render() {
        const { tags, suggestions } = this.state;
        return (
            <div>
                <ReactTags tags={tags}
                    suggestions={suggestions}
                    handleDelete={(i)=>{
                        this.props.handleDelete(i, (tags)=>{this.setState({tags:tags})})
                    }}
                    handleAddition={(tag)=>{
                        this.props.handleAddition(tag,(tags)=>{this.setState({tags:tags})})
                    }}
                    delimiters={delimiters} />
            </div>
        )
    }
};
   
export default TagSelect