import { IList } from './../common/IObjects';
interface ISpGithubWebinarState{
    lists?: IList[];    
    hiddenLists?:IList[],
    libraries?:IList[],
    others?:IList[]    
    
}
export default ISpGithubWebinarState;