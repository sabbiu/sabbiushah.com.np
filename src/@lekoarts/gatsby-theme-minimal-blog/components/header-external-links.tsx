/** @jsx jsx */
import React from 'react';
import { jsx, Link as TLink } from 'theme-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faLinkedin,
  faStackOverflow,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

import useMinimalBlogConfig from '@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config';

library.add(faTwitter, faLinkedin, faStackOverflow, faGithub, faEnvelope);

const HeaderExternalLinks = () => {
  const { externalLinks } = useMinimalBlogConfig();
  const [iconDisplay, setIconDisplay] = React.useState(false);
  React.useEffect(() => setIconDisplay(true));

  return (
    <React.Fragment>
      {externalLinks && externalLinks.length > 0 && (
        <div sx={{ 'a:not(:first-of-type)': { ml: 3 }, fontSize: [1, `18px`] }}>
          {externalLinks.map((link) => (
            <TLink
              key={link.url}
              href={link.url}
              style={iconDisplay ? {} : { display: 'none' }}
            >
              {/* {link.name} */}
              <FontAwesomeIcon
                icon={link.name === 'envelope' ? link.name : ['fab', link.name]}
              />
            </TLink>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default HeaderExternalLinks;
