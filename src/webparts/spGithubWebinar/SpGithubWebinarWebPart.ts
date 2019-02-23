import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SpGithubWebinarWebPartStrings';
import SpGithubWebinar from './components/SpGithubWebinar';
import MockupDataProvider from './dataproviders/MockupDataProvider';
import SharePointDataProvider from './dataproviders/SharePointDataProvider';
import { IDataProvider } from './dataproviders/IDataProvider';
import { ISpGithubWebinarProps } from './components/ISpGithubWebinarProps';

export interface ISpGithubWebinarWebPartProps {
  description: string;
}

export default class SpGithubWebinarWebPart extends BaseClientSideWebPart<ISpGithubWebinarWebPartProps> {
  private _dataProvider: IDataProvider;
  protected onInit(): Promise<void>{
    if(Environment.type === EnvironmentType.Local){  
      this._dataProvider = new MockupDataProvider();          
    }else{  
      this._dataProvider = new SharePointDataProvider(this.context);  
    }  
    return super.onInit(); 
  }
    public render(): void {
      
      const element: React.ReactElement<ISpGithubWebinarProps > = React.createElement(
        SpGithubWebinar,
        {
          provider: this._dataProvider
        }
      );
  
      ReactDom.render(element, this.domElement);
    }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
