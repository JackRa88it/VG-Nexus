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
                ///This suggestions list should be populated from the database
                { id: 'Action', text: 'Action' },
                { id: 'Arcade', text: 'Arcade' },
                { id: 'Shooter', text: 'Shooter' },
                { id: 'Role Playing', text: 'Role Playing'}
            ]
        };
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