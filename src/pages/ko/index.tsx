import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Home from '../../components/Home/Control'

export default function KoHome() {
    const {
        mdx: { rawBody, mdxBody },
    } = useStaticQuery(graphql`
        query KoHomePage {
            mdx(slug: { eq: "ko" }) {
                rawBody
                mdxBody: body
            }
        }
    `)
    return <Home rawBody={rawBody} mdxBody={mdxBody} locale="ko" />
}
