import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import styles from './SpfxPhotogallery.module.scss';
import * as strings from 'spfxPhotogalleryStrings';
import { ISpfxPhotogalleryWebPartProps } from './ISpfxPhotogalleryWebPartProps';

import * as $ from 'jquery';

import ModuleLoader from '@microsoft/sp-module-loader';

export default class SpfxPhotogalleryWebPart extends BaseClientSideWebPart<ISpfxPhotogalleryWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);

    ModuleLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/Camera/1.3.4/css/camera.css');
  }

  public render(): void {
    ModuleLoader.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.js', 'jQuery').then(($: any): void => {
        ModuleLoader.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js', 'jQuery').then(():void => {
          ModuleLoader.loadScript('https://cdnjs.cloudflare.com/ajax/libs/Camera/1.3.4/scripts/camera.min.js', 'jQuery').then(():void => {
            this.domElement.innerHTML = `
              <div class="camera_wrap" style="float:none;">
                  <div data-src="../src/webparts/spfxPhotogallery/images/1.jpg" data-thumb="../src/webparts/spfxPhotogallery/images/thumbs/1.jpg">
                    <div class="camera_caption">The text of your caption</div>
                  </div>
                  <div data-src="../src/webparts/spfxPhotogallery/images/2.jpg" data-thumb="../src/webparts/spfxPhotogallery/images/thumbs/2.jpg">
                    <div class="camera_caption">The text of your caption</div>
                  </div>
                  <div data-src="../src/webparts/spfxPhotogallery/images/3.jpg" data-thumb="../src/webparts/spfxPhotogallery/images/thumbs/3.jpg">
                    <div class="camera_caption">The text of your caption</div>
                  </div>
              </div>`;
              ($ as any)('.camera_wrap').camera(
                {
                  height: '41%',
                pagination: false,
                thumbnails: true
                }
              );
          });
        });
    });
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
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
