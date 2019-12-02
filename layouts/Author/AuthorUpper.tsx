import PageLayout from '../layouts/PageLayout'
import React, { Component } from 'react'
import PageWrapper from '../layouts/PageWrapper'
import fetch from 'isomorphic-unfetch'
import Error from 'next/error'
import { Config } from '../config.js'

import css from './style.css'

import { SizeMe } from 'react-sizeme'
import AuthorCard from '../../components/AuthorCard'
import ArticleCard from '../../components/ArticleCard'
import ClassifiedsCard from '../../components/ClassifiedsCard'

const ArticleAdStyle = {
  width: '100%',
  backgroundColor: '#aaa',
  height: '250px',
  lineHeight: '200px',
  textAlign: 'center',
  fontWeight: 'bold',
  fontFamily: 'sans-serif',
}

class AuthorUpper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authorCard: (
        <AuthorCard
          image={this.props.author['avatar_urls'][96]}
          name={this.props.author.name}
          position="ADMINISTRATOR"
          twitter="lol"
          email="lol"
        />
      ),
      horizCard: (
        <ArticleCard
          displayType='horz'
          headline='The Quad: &#8216;Black Christmas&#8217; remake to regift feminism to horror genre 45 years later'
          excerpt='<p>Christmas came early this year &#8211; at least, if you&#8217;re a horror fan.\n&#8216;Tis the season for nostalgia, since early last month, two high-profile projects were unveiled.</p>'
          url="./#"
          date={new Date()}
          authors={[{
          name: "Ryan Wu",
          url: "./#",
          }]}
          category={{
          name: "News",
          url: "./#",
          }}
          imageurl="https://dailybruin.com/images/2019/06/web.ae_.lorenzo.picA_.AK_-640x427.jpg"

        />
      ),
      longCard: (
        <ArticleCard
          displayType='long'
          headline='The Quad: &#8216;Black Christmas&#8217; remake to regift feminism to horror genre 45 years later'
          excerpt='<p>In writing, the words point and purpose are almost synonymous. Your point is your purpose, and how you decide to make your point clear to your reader is also your purpose. Writers have a point and a purpose for every paragraph that they create. Writers write descriptive paragraphs because their purpose is to describe something. Their point is that something is beautiful or disgusting or strangely intriguing. Writers write persuasive and argument paragraphs because their purpose is to persuade or convince someone. Their point is that their reader should see things a particular way and possibly take action on that new way of seeing things. Writers write paragraphs of comparison because the comparison will make their point clear to their readers.</p>'
          url="./#"
          date={new Date()}
          authors={[{
          name: "Ryan Wu",
          url: "./#",
          }]}
          category={{
          name: "News",
          url: "./#",
          }}
          imageurl="https://dailybruin.com/images/2019/06/web.ae_.lorenzo.picA_.AK_-640x427.jpg"

        />
      ),
      classifiedsCard: (
        <ClassifiedsCard
          header="Featured Classifieds"
          classifieds={[
            {
              category: { name: 'Room for Rent', url: './#' },
              content: {
                name:
                  'Female preferred to rent private furnished room with shared bath. $925 includes utilities and internet , full kitchen and laundry privileges. 1 dog and 2 cats in house. Non smoking. Julia 310-874-5908',
                url: './#',
              },
            },
            {
              category: { name: 'Apartments for Rent', url: './#' },
              content: {
                name:
                  'Westwood 3bed + 3bath 1,712sqft Condo for lease. Laundry in-unit + 2 car gated parking space. Private rooftop terrace. $4900/M. Call Mike at 310-666-5458 for showing. Available now!',
                url: './#',
              },
            },
            {
              category: { name: 'Apartments for Rent', url: './#' },
              content: {
                name:
                  '2 bedroom 2 1/2 bath Condo. Aproximately 2000 sq ft. $3999/month or fully furnished for $4485/month. Comfortable for 4-5 students 310-430-1626',
                url: './#',
              },
            },
            {
              category: { name: 'Computer/Internet', url: './#' },
              content: {
                name:
                  'GRAD STUDENT WANTED: I’m putting together a Kickstarter crowdfunding campaign and looking for a sharp grad student to promote it, primarily social media. Please send experience, pay rate and contact info to – ebrown@sky44.com',
                url: './#',
              },
            },
          ]}
        />
      )
    }
  }

  render() {
    return (
      <SizeMe monitorHeight={false}>
        {({ size }) => {
          if (size.width < 600) {
            return <p></p>
          } else if (size.width < 900) {
            return <p></p>
          } else {
            return (
              <div style={{ width: '100%'}}>
                <div style={{ width: '75%'}} className={css.column}>
                  <div
                    className={css.column}
                    style={{
                      width: '33%',
                    }}
                  >
                    <div id="a" className={css.card}>
                      {this.state.authorCard}
                    </div>
                  </div>
                  <div
                    className={css.column}
                    style={{
                      width: '67%',
                    }}
                  >
                    <div className={css.card}>
                      {this.state.horizCard}
                    </div>
                    <div className={css.card}>
                      {this.state.horizCard}
                    </div>
                  </div>
                  <div
                    className={css.column}
                    style={{ width: '100%'}}
                  >
                    <div className={css.card}>
                      {this.state.longCard}
                    </div>
                    <div className={css.card}>
                      {this.state.longCard}
                    </div>
                    
                  </div>

                </div>
                <div style={{ width: '25%'}} className={css.column}>
                  <div
                    id="extras"
                    className={css.column}
                    style={{
                      width: '100%',
                    }}
                  >
                    <div id="above-ad" className={css.card}>
                      <div style={ArticleAdStyle}>ADVERTISEMENT</div>
                    </div>
                    <div className={css.card}>
                      {this.state.classifiedsCard}
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        }}
      </SizeMe>
    )
  }
}

export default AuthorUpper
