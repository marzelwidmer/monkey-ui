import PropTypes from "prop-types"
import React, { Component } from "react"
import {Container,Divider,Grid,Header,Icon,Image,List,Menu,Responsive,Segment,Sidebar,Visibility} from "semantic-ui-react"
import AbDeployment from "../ab/AbDeployment";
import BgDeployment from "../bg/BgDeployment";

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === "undefined"
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}
/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <a name="home"></a> 
    <Header
      as="h1"
      content="Make JAR not WAR"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em"
      }}
    />
    <Header
      as="h2"
      content="Production Rocks. The only place to be."
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em"
      }}
    />
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
          <Segment inverted textAlign="center" style={{ minHeight: 700, padding: "1em 0em" }} vertical>
            <Menu fixed={fixed ? "top" : null} inverted={!fixed} pointing={!fixed} secondary={!fixed} size="large">
              <Container>
                <Menu.Item href="#">Home</Menu.Item>
                <Menu.Item href="#bg">Blue-Green</Menu.Item>
                <Menu.Item href="#ab">A/B</Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive as={Sidebar.Pushable} getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar as={Menu} animation="push" inverted onHide={this.handleSidebarHide} vertical visible={sidebarOpened}>
                <Menu.Item href="#">Home</Menu.Item>
                <Menu.Item href="#bg">Blue-Green</Menu.Item>
                <Menu.Item href="#ab">A/B</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment inverted textAlign="center" style={{ minHeight: 350, padding: "1em 0em" }} vertical>
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}



MobileContainer.propTypes = {
  children: PropTypes.node
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <a name="bg"></a>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: "2em" }}>
                Blue-Green Deployment
            </Header>
            <p style={{ fontSize: "1.33em" }}>
                Blue-green deployments involve running two versions of an application at the same time and moving production traffic from the old version to the new version. There are several ways to implement a blue-green deployment in OpenShift Container Platform.
            </p>
            <Header as="h3" style={{ fontSize: "2em" }}>
              <Divider as="h4" className="header" horizontal style={{ margin: "3em 0em", textTransform: "uppercase" }}>
                    When to Use
              </Divider>
            </Header>
            <p style={{ fontSize: "1.33em" }}>
            Use a blue-green deployment when you want to test a new version of your application in a production environment before moving traffic to it.
            Blue-green deployments make switching between two different versions of your application easy. However, since many applications depend on persistent data, you will need to have an application that supports N-1 compatibility if you share a database, or implement a live data migration between your database, store, or disk if you choose to create two copies of your data layer.
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>

            {/* <Image bordered rounded size="large" fluid src="/images/blue-green-1.jpg" alt="blue-green-1" />
            <Image bordered rounded size="large" fluid src="/images/blue-green-2.png" alt="blue-green-2" /> */}
            <BgDeployment service_url="http://bluegreen-dev.apps.c3smonkey.ch/actuator/info"/>

          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>



    <a name="ab"></a> 
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
      <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: "2em" }}>
                A/B Deployment
            </Header>
            <p style={{ fontSize: "1.33em" }}>
            A/B deployments generally imply running two (or more) versions of the application code or application configuration at the same time for testing or experimentation purposes.
            The simplest form of an A/B deployment is to divide production traffic between two or more distinct shards — a single group of instances with homogeneous configuration and code.
            </p>
            

            <Header as="h3" style={{ fontSize: "2em" }}>
              <Divider as="h4" className="header" horizontal style={{ margin: "3em 0em", textTransform: "uppercase" }}>
                    When to Use
              </Divider>
            </Header>
            <p style={{ fontSize: "1.33em" }}>
            <ul>
                <li>When you want to test multiple versions of code or configuration, but are not planning to roll one out in preference to the other.</li>
                <li>When you want to have different configuration in different regions.</li>
            </ul>
                An A/B deployment groups different configuration and code — multiple shards — together under a single logical endpoint. Generally, these deployments, if they access persistent data, should properly deal with N-1 compatibility (the more shards you have, the more possible versions you have running). Use this pattern when you need separate internal configuration and code, but end users should not be aware of the changes.
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
             {/* <Image bordered rounded size="large" fluid src="/images/ab-testing-1.png" alt="abtesting1" />
             <Image bordered rounded size="large" fluid src="/images/ab-testing-2.png" alt="abtesting2" /> */}

             <AbDeployment service_url="http://ab-route-dev.apps.c3smonkey.ch/actuator/info"/>

          </Grid.Column>
        </Grid.Row>
      </Grid>
     </Segment>





{/*     <Segment style={{ padding: "8em 0em" }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: "2em" }}>
          Breaking The Grid, Grabs Your Attention
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing
          by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth
          your attention.
        </p>

        <Divider as="h4" className="header" horizontal style={{ margin: "3em 0em", textTransform: "uppercase" }}>
          <a href="#">Case Studies</a>
        </Divider>

        <Header as="h3" style={{ fontSize: "2em" }}>
          Did We Tell You About Our Bananas?
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but it's really true.
          It took years of gene splicing and combinatory DNA research, but our bananas can really dance.
        </p>
        
      </Container>
    </Segment>

 */}


    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="a"><a href="https://github.com/c3smonkey" target="_blank">Github</a></List.Item>
                <List.Item as="a"><a href="http://marcelwidmer.org" target="_blank">Marcel Widmer</a></List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <List.Item href="http://ab-route-dev.apps.c3smonkey.ch/" target="_blank">MonkeyMongoService</List.Item>
                <List.Item href="https://console.c3smonkey.ch:8443" target="_blank">Openshift</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4" inverted>
                Make JAR not WAR
              </Header>
              <p>Keep Calm - Production Rocks - The only place to be.</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

export default HomepageLayout
