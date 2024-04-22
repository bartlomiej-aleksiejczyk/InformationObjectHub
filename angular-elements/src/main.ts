import { appConfig } from './app/app.config';
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { InfoobjectDetailsMainComponent } from './app/features/infoobject-details/infoobject-details-main.component';
import { CopyableSnippetComponent } from './app/shared/components/copyable-snippet/copyable-snippet.component';

(async () => {
  const app = createApplication(appConfig);

  const customElementInfoobjectDetails = createCustomElement(
    InfoobjectDetailsMainComponent,
    {
      injector: (await app).injector,
    }
  );

  customElements.define('info-objects-details', customElementInfoobjectDetails);
  const customElementCopyableSnippet = createCustomElement(
    CopyableSnippetComponent,
    {
      injector: (await app).injector,
    }
  );

  customElements.define('copyable-snippet', customElementCopyableSnippet);
})();
