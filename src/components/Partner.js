import React from 'react'
import {app} from '../db/Config'
import Card from 'react-bootstrap/Card'
import {MemberShortDescription} from './MemberShortDescription'
import {Avatar} from './Avatar'
import MemEdit from './MemEdit'
import {Options} from './Options'
class Partner extends React.Component{
    constructor(){
        super()
        this.state={
            memKey:null,
            name:"name",
            description:"description",
            residence:"residence",
            partner:null,
            memEdit:false,
            showOptions:false
        }
        this.memEdit = this.memEdit.bind(this)
    }
        memEdit(x){
            this.setState({memEdit:x})
        }
        componentDidMount(){
            const memData = app.database().ref('/members/' + this.props.memKey)
            setTimeout(() => {
                memData.on('value',snap => {
                    var data = snap.val()
                    !!snap.val() ?
                        this.setState({
                            memKey:this.props.memKey,
                            name:data.name,
                            description:data.description,
                            residence:data.residence,
                            partner:data.partner,
                            children:data.children,
                            siblings:data.siblings,
                            type:data.type}):
                            console.log("no data at that")
                    })  
            }, 100);
        }
        showOptions(){
            this.setState({showOptions:!this.state.showOptions})
        }
    render(){
        return(
            <div className="MemberData">
            <Card
            onClick={()=>{this.showOptions()}}>

                <div className="imageContainer">

                    <Avatar 
                    url={this.props.famKey + this.state.memKey}/>

                    <div className="overlay">

                        <MemberShortDescription 
                        name={this.state.name} 
                        description={this.state.description}
                        residence={this.state.residence}/>

                    </div>

                </div>
                <Card.Body>
                    <Card.Title>{this.state.name}</Card.Title>
                </Card.Body>
            </Card>
            {
                this.state.showOptions === true 
                    ? 
                    <Options showOptions={()=>{this.showOptions()}} addRelative={this.props.addRelative} memEdit={this.memEdit}/>
                    :null
                }
            {
                this.state.memEdit === true
                ?<MemEdit 
                memKey={this.state.memKey} 
                famKey={this.props.famKey}
                memEditDisplay={this.memEdit}/>
                :<p>{this.state.memEdit}</p>
            }
            </div>
        )
    }
}
export default Partner