import React from 'react'
import Layout from './Layout'
import Container from '../components/Container'

const ContentLayout = ({data = {}, children}) => {

	return (
		<Layout admin={!!data && (data.admin || false)}>
			<Container>
				{children}
			</Container>
		</Layout>
		
	)
}

ContentLayout.getLayout = (data, page) => <ContentLayout data={data}>{page}</ContentLayout>;

export default ContentLayout