/** @jsx jsx */
import React from 'react';
import { jsx, useColorMode, Styled } from 'theme-ui';
import { Link } from 'gatsby';
import { Flex } from '@theme-ui/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import useSiteMetadata from '@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-site-metadata';
import ColorModeToggle from '@lekoarts/gatsby-theme-minimal-blog/src/components/colormode-toggle';
import useNavigation from '@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-navigation';
import Navigation from '@lekoarts/gatsby-theme-minimal-blog/src/components/navigation';
import replaceSlashes from '@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes';
library.add(fab, fas);

const Header = () => {
  const { siteTitle, externalLinks, basePath } = useSiteMetadata();
  const nav = useNavigation();
  const [colorMode, setColorMode] = useColorMode();
  const isDark = colorMode === `dark`;
  const toggleColorMode = (e: any) => {
    e.preventDefault();
    setColorMode(isDark ? `light` : `dark`);
  };

  const [iconDisplay, setIconDisplay] = React.useState(false);
  React.useEffect(() => setIconDisplay(true));

  return (
    <header sx={{ mb: [5, 6] }}>
      <Flex sx={{ alignItems: `center`, justifyContent: `space-between` }}>
        <Link
          to={replaceSlashes(`/${basePath}`)}
          aria-label={`${siteTitle} - Back to home`}
          sx={{ color: `heading`, textDecoration: `none` }}
        >
          <h1 sx={{ my: 0, fontWeight: `medium`, fontSize: [3, 4] }}>
            {siteTitle}
          </h1>
        </Link>
        <ColorModeToggle isDark={isDark} toggle={toggleColorMode} />
      </Flex>
      <div
        sx={{
          boxSizing: `border-box`,
          display: `flex`,
          variant: `dividers.bottom`,
          alignItems: `center`,
          justifyContent: `space-between`,
          mt: 3,
          color: `secondary`,
          a: { color: `secondary`, ':hover': { color: `heading` } },
          flexFlow: `wrap`
        }}
      >
        <Navigation nav={nav} />
        <div sx={{ 'a:not(:first-of-type)': { ml: 3 }, fontSize: [1, `18px`] }}>
          {externalLinks.map(link => (
            <Styled.a
              key={link.url}
              href={link.url}
              style={iconDisplay ? {} : { display: 'none' }}
            >
              {/* {link.name} */}
              <FontAwesomeIcon
                icon={link.name === 'envelope' ? link.name : ['fab', link.name]}
              />
            </Styled.a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;