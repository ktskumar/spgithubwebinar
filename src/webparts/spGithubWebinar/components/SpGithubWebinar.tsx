import * as React from 'react';
import styles from './SpGithubWebinar.module.scss';
import { ISpGithubWebinarProps } from './ISpGithubWebinarProps';
import { escape } from '@microsoft/sp-lodash-subset';
import ISpGithubWebinarState from './ISpGithubWebinarState';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import { IDataProvider } from './../dataproviders/IDataProvider';
import { IList } from './../common/IObjects';

export default class SpGithubWebinar extends React.Component<ISpGithubWebinarProps, ISpGithubWebinarState> {
  constructor(props:ISpGithubWebinarProps){
    super(props);
    this.state={
      lists:[],      
      libraries:[],
      others:[],
      hiddenLists:[]
    };
  }
  
  public componentDidMount(){
    this.props.provider.getAllLists().then((_lists: IList[])=>{      
      let _hiddenLists = _lists.filter(e=>e.Hidden === true);
      let _libraries = _lists.filter(e=>e.BaseType === 1);
      let _others = _lists.filter(e=>e.BaseType != 1);
      this.setState({
        lists:_lists,        
        hiddenLists:_hiddenLists,
        libraries:_libraries,
        others:_others
      

      })
    });
  }
  public render(): React.ReactElement<ISpGithubWebinarProps> {
    
    return (
      <div >
        <div >
        <ProgressIndicator label="Total Lists &amp; Libraries" description={this.state.lists.length.toString()} percentComplete={this.state.lists.length/this.state.lists.length} />
        <ProgressIndicator label="Total Libraries" description={this.state.libraries.length.toString()} percentComplete={this.state.libraries.length/this.state.lists.length} />
        <ProgressIndicator label="Total Lists" description={this.state.others.length.toString()} percentComplete={this.state.others.length/this.state.lists.length} />
        <ProgressIndicator label="Hidden Lists &amp; Libraries" description={this.state.hiddenLists.length.toString()} percentComplete={this.state.hiddenLists.length/this.state.lists.length} />
          
        </div>
      </div>
    );
  }
}
