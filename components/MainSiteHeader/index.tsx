import * as React from 'react'
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/core'
import * as MainSiteStyles from '../globals'
import HeaderBar from './HeaderBar'
import SectionHeader from './index.jsx' // Import SectionHeader

interface MainSiteHeaderLink {
  category: string
  categoryURL: string
}

interface MainSiteHeaderProps {
  links: MainSiteHeaderLink[]
  hamburger: boolean
}

class MainSiteHeader extends React.Component<MainSiteHeaderProps> {
  constructor(props: MainSiteHeaderProps) {
    super(props)
    this.state = {
      subcategories: {}, // Store fetched subcategories
    }
  }

  async componentDidMount() {
    try {
      const subcategoriesMap = {};

      // Fetch subcategories for each main category
      await Promise.all(
        this.props.links.map(async (mainCategory) => {
          const response = await fetch(
            `https://wp.dailybruin.com/wp-json/wp/v2/categories?parent=${mainCategory.categoryID}`
          );
          const data = await response.json();

          subcategoriesMap[mainCategory.category] = data.map((sub) => ({
            name: sub.name,
            link: sub.link,  // Use the WordPress-provided link
          }));
        })
      );

      this.setState({ subcategories: subcategoriesMap });

    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  }

  public render() {
    return (
      <div>
        <div
          css={css`
            ${MainSiteStyles.mediaMobileBreakpoint} {
              display: block;
            }
            display: none;
            background-color: #fff;
          `}
        >
          <HeaderBar {...this.props} hamburger={true} />
        </div>
        <div
          css={css`
            ${MainSiteStyles.mediaMobileBreakpoint} {
              display: none;
            }
            display: block;
            background-color: #fff;
          `}
        >
          <HeaderBar {...this.props} hamburger={this.props.hamburger} />
        </div>

        {/* Render SectionHeader for each main category with dynamic subcategories */}
        {this.props.links.map((mainCategory) => (
          <SectionHeader
            key={mainCategory.category}
            category={mainCategory.category}
            subcategories={this.state.subcategories[mainCategory.category] || []}
          />
        ))}
      </div>
    )
  }
}

export default MainSiteHeader
