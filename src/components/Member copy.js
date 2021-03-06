import React from 'react'
import AddRelative from './AddRelative'
import {app} from '../db/Config'
import Card from 'react-bootstrap/Card'
import {Image} from 'cloudinary-react';
import Partner from './Partner'
class MemberCard extends React.Component{

    render(){
        return(
            <div>
                <p>xd</p>
            </div>
        )
    }
}
class Member extends React.Component {
    constructor(){
        super()
        this.state={
            memKey:"",
            famKey:[],
            name:"",
            children:[],
            siblings:[],
            partner:'',
            buttonDisplay:false,
            addRelativeType:null,
            type:null
        }
        this.addRelative = this.addRelative.bind(this)
    }
    Focus(x){
            this.setState({buttonDisplay:x})
    }
    addRelative(type){
        this.setState({addRelativeType:type})
    }
    showDescription(){
        console.log("showing")
    }

    //state settings:
    componentDidMount(){
        const memData = app.database().ref('/members/' + this.props.memKey)
        setTimeout(() => {
            memData.on('value',snap => {
                var data = snap.val()
                !!snap.val() ?
                    this.setState({
                        memKey:this.props.memKey,
                        name:data.name,
                        partner:data.partner,
                        children:data.children,
                        siblings:data.siblings,
                        type:data.type}):
                        console.log("no data at that")
                })  
        }, 50);
    }

    render() {
      return (
        <div className="MemberComponent">
        <div className="Partners"  
            onMouseEnter={()=>this.Focus(true)} 
            onMouseLeave={()=>this.Focus(false)}>

            <div className="Partner">
                {!!this.state.partner && this.state.type!=="/partner/"?
                <Partner childrenKeys={this.state.children} 
                        memKey={this.state.partner} 
                        famKey={this.props.famKey}
                        />
                        :null}
            </div>

            <div className="MemberData" onClick={()=>{this.showDescription()}}>

                {/* member loook */}
            <Card>
            <Image cloudName="m4t1ce" 
            publicId={this.props.famKey+"/"+"-M6_JNuuyDv40cjhXvRC"} >
            </Image>

            <Card.Body>
                <Card.Title>{this.state.name}</Card.Title>
            </Card.Body>
            </Card>
        </div>
        </div>
            {this.state.buttonDisplay===true ? 
                <div className="addRelativeButtons" 
                onMouseEnter={()=>this.Focus(true)}
                onMouseLeave={()=>this.Focus(false)} >
                    <button onClick={()=>this.addRelative("/children/")}>AddChild</button>
                    <button onClick={()=>this.addRelative("/partner/")}>AddPartner</button>
                </div>
                :null
            }
            {this.state.addRelativeType!==null ?
                <AddRelative type={this.state.addRelativeType} 
                            famKey={this.props.famKey} 
                            relKey={this.state.memKey}
                            memList={this.props.memList}
                            notify={this.addRelative}/>
                            :null
            }
        <div className="MemberChildren">
                {!!this.state.children ?
                    this.state.children.map(x=>{
                        return <Member key={x} memKey={x} famKey={this.props.famKey} />})
                        :null
                }
        </div>
      </div>)
    }
}

  export default Member