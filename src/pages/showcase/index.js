import React from "react";
import { Link } from "gatsby";
import CoverImage from '../../components/cover-image';
import Layout from '../../components/layout';
import LayoutSingleColumn from '../../components/layout-single-column';

const ShowCase = () => {
    return (
        <Layout>
            <LayoutSingleColumn>
                <section className="mx-auto lg:max-w-[44rem] px-4 lg:px-0 text-left w-full">
                    <CoverImage title="Showcase of works" />
                    <div className='markdown-text'>
                        <ol>
                            <li><Link to="/showcase/smith-charts">Smith Chart</Link></li>

                        </ol>
                    </div>
                </section>
            </LayoutSingleColumn>
        </Layout>

    )
}

export default ShowCase;