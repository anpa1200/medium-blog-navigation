import React from 'react';
import OriginalHome from '@theme-original/DocBreadcrumbs/Items/Home';
import IconHome from '@theme/Icon/Home';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {translate} from '@docusaurus/Translate';

export default function HomeBreadcrumb(props) {
  const {metadata} = useDoc();
  const href = useBaseUrl('/');
  if (!metadata.id.endsWith('2026/cyberattacks-on-big-pharma-and-its-ecosystem')) {
    return <OriginalHome {...props} />;
  }
  // Keep the destination, keyboard behavior, and accessible label. A native
  // anchor avoids prefetching the complete archive catalogue during this read.
  return <li className="breadcrumbs__item">
    <a className="breadcrumbs__link" href={href} aria-label={translate({
      id: 'theme.docs.breadcrumbs.home', message: 'Home page',
      description: 'The ARIA label for the home page in the breadcrumbs',
    })}>
      <IconHome style={{position: 'relative', top: 1, verticalAlign: 'top', height: '1.1rem', width: '1.1rem'}} />
    </a>
  </li>;
}
