import PageLayout from '../layouts/PageLayout'
import PageWrapper from '../layouts/PageWrapper'
import React, { Component } from "react";
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error'
import { Config } from '../config.js';

import SectionHeader from '@dailybruin/lux/src/components/SectionHeader'
import CategoryUpper from '../layouts/Category/CategoryUpper'


class Category extends Component {
	static async getInitialProps(context) {
		console.log("initial props for category");
		const { slug } = context.query;
		const categoryRes = await fetch(
			`${Config.apiUrl}/wp-json/wp/v2/categories?slug=${slug}`
		);
		const category = await categoryRes.json();
		if (category.length > 0) {
			const categoriesRes = await fetch(
				`${Config.apiUrl}/wp-json/wp/v2/categories?parent=${category[0].id}`
			);
			const categories = await categoriesRes.json();
			const postsRes = await fetch(
				`${Config.apiUrl}/wp-json/wp/v2/posts?_embed&categories=${
				category[0].id
				}`
			);
			const posts = await postsRes.json();
			return { category, categories, posts };
		}
		return { category };
	}
	render() {
		console.log(this.props.category);
		if (this.props.category.length == 0)
			return <Error statusCode={404} />;

		const posts = this.props.posts.map((post, index) => {
			return (
				<ul key={index}>
					<li>
						<Link
							as={`/post/${post.slug}`}
							href={`/post?slug=${post.slug}&apiRoute=post`}
							>
							<a>{post.title.rendered}</a>
						</Link>
					</li>
				</ul>
			);
		});
		if (this.props.categories.length == 0) {
			console.log(this.props.categories);
			return (
				<PageLayout>
					<SectionHeader name={this.props.category[0].name} sectionList={[]} />
					<h1>{this.props.category[0].name} Posts</h1>
					{posts}
				</PageLayout>
			);
		}
		else {
			const sectionLinks = this.props.categories.map(index => {
				return ({name: index.name, link: index.link})
			});
			return (
			<PageLayout>
				<SectionHeader name={this.props.category[0].name} sectionList={sectionLinks}/>
				<CategoryUpper></CategoryUpper>
				<h1>{this.props.category[0].name} Posts</h1>
				{posts}
			</PageLayout>
			);
		}
	}
}

export default PageWrapper(Category);
