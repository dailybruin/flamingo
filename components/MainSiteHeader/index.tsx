// import * as React from 'react'
// /** @jsxImportSource @emotion/react */
// import { css, jsx } from '@emotion/core'

// import * as MainSiteStyles from '../globals'
// import HeaderBar from './HeaderBar'

// interface MainSiteHeaderLink {
//   /** Category name */
//   category: string
//   /** Link location */
//   categoryURL: string
// }

// interface MainSiteHeaderProps {
//   /** Array of links that refer to sections on the main site */
//   links: MainSiteHeaderLink[]
//   /** Display smaller version with hamburger */
//   hamburger: boolean
// }

// class MainSiteHeader extends React.Component<MainSiteHeaderProps> {
//   constructor(props: MainSiteHeaderProps) {
//     super(props)
//   }

//   public render() {
//     return (
//       <div>
//         <div
//           css={css`
//             ${MainSiteStyles.mediaMobileBreakpoint} {
//               display: block;
//             }
//             display: none;
//             background-color: #fff;
//           `}
//         >
//           <HeaderBar {...this.props} hamburger={true} />
//         </div>
//         <div
//           css={css`
//             ${MainSiteStyles.mediaMobileBreakpoint} {
//               display: none;
//             }
//             display: block;
//             background-color: #fff;
//           `}
//         >
//           <HeaderBar {...this.props} hamburger={this.props.hamburger} />
//         </div>
//       </div>
//     )
//   }
// }
// export default MainSiteHeader
