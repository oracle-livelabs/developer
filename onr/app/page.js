'use client';
import Link from "next/link";
import setup from "./onr/details/setup.js"
import x from "./dummy.html"
import Image from "next/image"

const HomePage = () => {

  return (
    <div>
      <hi>Oracle 23c Database Developer Features</hi>
      <br></br>
      <br></br>
      Some of the links below are not implemented yet.

      <table className="table table-zebra">
          <thead>
            <tr>
              <th className="text-blue-900 text-2xl">Feature</th> 
              <th className="text-blue-900 text-2xl">Business Value</th> 
            </tr>
          </thead> 
          <tbody>
              <tr>
                <th>Click each feature below for details and simple examples to demonstrate what's possible</th> 
                <th>Just think about the possibilities this technology brings about!</th> 
              </tr>

              <tr>
                <th><Link href="/onr"><Image src={"/images/ONR.png"} width={50} height={50} />ONR</Link></th> 
                <th><span style={{ color: 'blue' }}>Oracle Next React (ONR)</span>
                <br></br>
                <br></br>
                If you are a React.js-Next.js developer, you are using the most popular Javascript library and framework in 2022. 
                There are 30 million such developers.
                This means you have a huge community of developers from which to draw knowledge, expertise and support.
                Add Oracle database 23c to the mix and you have the most powerful full-stack web development platform on the market.</th> 
              </tr>

              <tr>
                <th><Link href="/onr-db23c"><Image src={"/images/ONR.png"} width={50} height={50} />DB23c</Link></th> 
                <th><span style={{ color: 'blue' }}>Oracle Database 23c</span>
                <br></br>
                <br></br>
                With the Oracle Database 23c release developers now have access to innovative Oracle Database features that simplify development of modern data-driven applications.</th> 
              </tr>

              <tr>
                <th><Link href="/onr-sql"><Image src={"/images/sql.png"} width={50} height={50} />ONR-SQL</Link></th> 
                <th><span style={{ color: 'blue' }}>Do you know about multi-table upsert views? These are not new to 23c but they are very useful and they are similar to JSON-Relational Duality Views, which will be demonstrated next.</span>
                <br></br>
                <br></br>
                Multi-table upsert views are ideal for loading external data into a database. For instance, it's very easy to convert CSV's into multi-table upsert views.</th> 
              </tr>

              <tr>
                <th><Link href="/onr-duality"><Image src={"/images/json.png"} width={50} height={50} />ONR-Duality</Link></th> 
                <th><span style={{ color: 'blue' }}>Are you a React.js developer? If so, JSON-Relational Duality Views are a revolutionary, must have technology for you.</span>
                <br></br>
                <br></br>
                  JSON-Relational Duality Views significantly reduce complexity for modern, document-centric web developers like React.js developers by 
                  eliminating the translation of JSON to normalized tables. 
                  See this video as to why this is important - TBD. Storing the data in tables also makes the other features of the 23c converged database available to the applicatoin developers.
                  If you have or use a React.js development team, the Oracle converged database is the best backend for your applications and it's made very 
                  easy to use with the JSON-Relational Duality Views. 
                <br></br>
                <br></br>
                  This lab was designed to show how easy it is to use JSON-Relational Duality Views and other 23c technology in the same converged database as the backend for a Next-React applcation.</th> 
              </tr>

              <tr>
                <th><Link href="/onr-mem"><Image src={"/images/in-mem.png"} width={50} height={50} />ONR-In-Memory</Link></th> 
                <th><span style={{ color: 'blue' }}>Do you want to use your database for transaction processing and analytics at the same time and in real time?</span>
                <br></br>
                <br></br>
                Oracle Database In-Memory implements state-of-the-art algorithms for in-memory scans, joins, and aggregation. These optimizations, along with SIMD vector processing, 
                enable Oracle Database In-Memory to run queries at billions of rows per second for each CPU core. Analytics that previously took hours or 
                longer to run can now complete in seconds, enabling real-time business decisions.
                </th> 
              </tr>

              <tr>
                <th><Link href="/onr-pgq"><Image src={"/images/graph.png"} width={50} height={50} />ONR-PGQ</Link></th> 
                <th><span style={{ color: 'blue' }}>Do you want to perform graph analytics on the data in your database without loading a separate graph database product such as neo4j?</span>
                <br></br>
                <br></br>
                <ul>
                  <li>
                    - Modeling your data as a graph can help you find connections in data. With graphs you can uncover money laundering in financial transactions, 
                    traverse linked components in manufacturing data, search for connected parts in a supply chain inventory, 
                    find impacted nodes in a telecommunication network failure, and more. 
                  </li>
                  <li>
                    - A new extension to standard ISO SQL, Property Graph Query (PGQ) simplifies complex queries and provides graph analytics capabilities. 
                  </li>
                  <li>
                    - Graph Studio in Oracle Autonomous Database 
                    makes it easy for developers to get started with graph queries and graph analytics.
                    You can create, query, analyze, and visualize graphs using automated graph modeling tools, a SQL-like graph query language, 
                    and pre-built graph algorithms, all using data in tables in your autonomous database.  
                  </li>
                  <li>
                  - An interesting use case for graphs ! https://dzone.com/articles/graph-databases-and-baseball?edition=598292&utm_campaign=&utm_content=Graph%20databases%20and%20baseball&utm_medium=email&utm_source=dzone&utm_term=
                  </li>
                </ul>
                </th> 
              </tr>

              <tr>
                <th><Link href="/onr-mle"><Image src={"/images/mle.png"} width={50} height={50} />MLE</Link></th> 
                <th><span style={{ color: 'blue' }}>Oracle Database Multilingual Engine</span></th> 
              </tr>

              <tr>
                <th><Link href="/onr-kg"><Image src={"/images/kgraph.png"} width={50} height={50} />ONR-Knowledge Graph</Link></th> 
                <th><span style={{ color: 'blue' }}>Do you want access to huge amounts of structured data on the Web in your application?</span></th> 
              </tr>

              <tr>
                <th><Link href="/onr-oml"><Image src={"/images/oml.png"} width={50} height={50} />ONR-OML</Link></th> 
                <th><span style={{ color: 'blue' }}>Do you want to perform machine learning on the data in your database without moving it?</span>
                <br></br>
                <br></br>
                Oracle Machine Learning (OML) provides in-database machine learning that enables you to solve key enterprise business problems and accelerates the development
                and deployment of data science and machine learning-based solutions. Benefit from scalable, automated, and secure machine learning to meet the challenges of 
                data exploration and preparation as well as model building, evaluation, and deployment. Whether your interests include APIs for SQL, Python, R, or REST, or 
                you prefer no-code user interfaces, Oracle provides support for solution development and deployment.</th> 
              </tr>

              <tr>
                <th><Link href="/onr-spatial"><Image src={"/images/spatial.png"} width={50} height={50} />ONR-Spatial</Link></th> 
                <th><span style={{ color: 'blue' }}>Do you want add spatial attributes to your data?</span>
                <br></br>
                <br></br>
                Oracle's spatial database is included in Oracle's converged database, allowing developers and analysts to get started easily with location intelligence analytics
                and mapping services. It enables Geographic Information System (GIS) professionals to successfully deploy advanced geospatial applications. 
                Organizations can manage different types of geospatial data, perform hundreds of spatial analytic operations, and use interactive map visualization tools with the spatial 
                features in Oracle Autonomous Database and Oracle Database.</th> 
              </tr>
          </tbody> 
        </table>

        <br></br>
        <pre>These will not demonstrate 23c database database features but they are included to demonstrate how additional useful features can be added to an app.</pre>
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th> 
              <th></th> 
            </tr>
          </thead> 
          <tbody>
              <tr>
                <th><Link href="/onr-chatgpt"><Image src={"/images/api.png"} width={50} height={50} />ONR-APIs-ChatGPT</Link></th> 
                <th><span style={{ color: 'blue' }}>Would you like to incorporate ChatGPT into your application?</span>
                <br></br>
                <br></br>
                Here's a simple example of doing that.</th> 
              </tr> 
              <tr>
                <th><Link href="/onr-mysql"><Image src={"/images/mysql.png"} width={50} height={50} />ONR-MySQL Heatwave</Link></th> 
                <th><span style={{ color: 'blue' }}>Would you like to incorporate some data from a MySQL database into your application.</span>
                <br></br>
                <br></br>
                Here's a simple example of doing that?</th> 
              </tr> 
          </tbody> 
        </table>

      <br></br>
      23c Documatation<br />
      <br></br>
      
    </div>
  );
}

  export default HomePage;
