/*
* Contact form page
*/
import React from "react";
import { graphql, StaticQuery } from 'gatsby';
import { isEmail, sanitizeKeepUnicode } from "../util/string-validator";
import CoverImage from '../components/cover-image';
import Layout from "../components/layout";
import LayoutSingleColumn from "../components/layout-single-column";
import MarkdownView from "react-showdown";
import { trackCustomEvent } from "gatsby-plugin-google-analytics";

// Parses the JSON returned by a network request
const parseJSON = resp => (resp.json ? resp.json() : resp);

// Checks if a network request came back fine, and throws an error if not
const checkStatus = resp => {
  if (resp.status >= 200 && resp.status < 300) {
    return resp;
  }
  return parseJSON(resp).then(resp => {
    throw resp;
  });
};

const headers = {
  'Content-Type': 'application/json',
};

const initalInputState = {
  name: '',
  email: '',
  message: '',
};

const initalInputValidationState = {
  name: { isValid: true, errorMessage: '' },
  email: { isValid: true, errorMessage: '' },
  message: { isValid: true, errorMessage: '' },
};

const emailValidation = email => {
  if (isEmail(email)) {
    return { isValid: true, errorMessage: null };
  }
  if (email.trim() === '') {
    return { isValid: false, errorMessage: 'Email is required' };
  }
  return { isValid: false, errorMessage: 'Please enter a valid email' };
};

const stringValidation = (testString, name) => {
  if (testString.trim() === '') {
    return { isValid: false, errorMessage: name + 'is required', };
  }
  return { isValid: true, errorMessage: null };
};


class Contact extends React.Component {
  // State of your application
  constructor(props) {
    super(props);
    this.state = {
      // State that contains input values
      modifiedData: initalInputState,
      // State that contains isValid boolean and error message for all inputs
      modifiedDataValidMessage: initalInputValidationState,
      // Social media icons and links
      socialMedias: [],
      // Initially -1 Failure 0 Attempting 0.5 Success 1 
      isSubmitSuccessful: -1,
      // Loading Social Media Icons
      isSocialMediaLoaded: false,
      error: null,
    };
  };

  handleInputChange = ({ target: { name, value } }) => {
    if (name !== "email") {
      value = sanitizeKeepUnicode(value);
    }
    this.setState(prev => ({
      ...prev,
      modifiedData: {
        ...prev.modifiedData,
        [name]: value,
      },
    }));
  };

  handleSubmit = async e => {
    e.preventDefault();
    trackCustomEvent({
      // string - required - The object that was interacted with (e.g.video)
      category: "Contact form submit button",
      // string - required - Type of interaction (e.g. 'play')
      action: "Click",
      // string - optional - Useful for categorizing events (e.g. 'Spring Campaign')
      label: "Engagement",
    });
    this.setState({
      modifiedDataValidMessage: {
        name: stringValidation(this.state.modifiedData.name, "Name "),
        email: emailValidation(this.state.modifiedData.email),
        message: stringValidation(this.state.modifiedData.message, "Message "),
      },
    }, async () => {
      // making sure all inputs are valid
      const isValidationCompleted = Object.values(this.state.modifiedDataValidMessage).every(x => (x.isValid === true));
      if (isValidationCompleted) {
        try {
          // set to loading state
          this.setState({ isSubmitSuccessful: 0.5 });
          // making fetch request
          await fetch(process.env.GATSBY_API_URL + '/contactforms', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(this.state.modifiedData),
          })
            .then(checkStatus)
            .then((resp) => (resp) ? this.setState({ isSubmitSuccessful: 1, modifiedData: initalInputState }) : "")
        } catch (error) {
          this.setState({ isSubmitSuccessful: 0 });
        }
      } else {
        this.setState({ isSubmitSuccessful: -1 });
      }
    });
  };

  render() {

    // Error message for form
    const errorMessage = (field) => {
      return (
        <span className="error-message">{this.state.modifiedDataValidMessage[field].errorMessage}</span>
      )
    };
    const seo = {
      metaTitle: 'Contact Page',
      isArticle: false,
    };
    return (
      <Layout seo={seo}>
        <LayoutSingleColumn>
          <section className="max-w-screen-md contact-container px-2">
            <div className="contact-left pr-4">
            <CoverImage title="Contact Me!" />
              <StaticQuery
                query={query}
                render={data =>
                  <>
                    <MarkdownView
                      className="markdown-text"
                      markdown={data.strapiSmallText.content}
                      options={{ emoji: true }}
                    />
                    <div className="flex">
                      {data.allStrapiSocialmedia.nodes.map(media => (
                        <a href={media.link} key={media.id} className="mx-0.5">
                          <img className="w-6 h-6" src={media.image} alt={media.name} />
                        </a>
                      ))}
                    </div>
                  </>
                }
              />
            </div>
            <div className="contact-right">
              <div className="border-2 border-primary-dark p-4 rounded shadow-md flex flex-col mt-2 contact-form-card">
                <form>
                  <div className="form-inputs p-2 mb-2 flex flex-col justify-between text-primary">
                    <label htmlFor="name"><p className="my-1 font-bold text-primary">Name:&nbsp;</p>{this.state.modifiedDataValidMessage.name.isValid ? "" : errorMessage("name")}</label>
                    <input
                      type="text"
                      name="name"
                      value={this.state.modifiedData.name}
                      onChange={this.handleInputChange}
                      className='border-2 px-1 border-primary-dark rounded ${this.state.modifiedDataValidMessage.name.isValid ? "" : "red-underline"}'
                    />
                  </div>
                  <div className="form-inputs p-2 mb-2 flex flex-col justify-between text-primary">
                    <label htmlFor="email"><p className="my-1 font-bold text-primary">Email:&nbsp;</p>{this.state.modifiedDataValidMessage.email.isValid ? "" : errorMessage("email")}</label>
                    <input
                      type="text"
                      name="email"
                      value={this.state.modifiedData.email}
                      onChange={this.handleInputChange}
                      className='border-2 px-1 border-primary-dark rounded ${this.state.modifiedDataValidMessage.email.isValid ? "" : "red-underline"}'
                    />
                  </div>
                  <div className="form-inputs p-2 flex flex-col justify-between text-primary">
                    <label htmlFor="message"><p className="my-1 font-bold text-primary">Message:&nbsp;</p>{this.state.modifiedDataValidMessage.message.isValid ? "" : errorMessage("message")}</label>
                    <textarea
                      type="textarea"
                      name="message"
                      value={this.state.modifiedData.message}
                      onChange={this.handleInputChange}
                      className='border-2 px-1 border-primary-dark min-h-10 rounded ${this.state.modifiedDataValidMessage.message.isValid ? "" : "red-underline"}'
                    >
                    </textarea>
                    <div className="flex mt-2 justify-end items-center form-submit-container">
                      {(() => {
                        switch (this.state.isSubmitSuccessful) {
                          // failure case
                          case 0:
                            return <div className="error-message text-sm flex items-center">Failure! Try again later.</div>
                          // success case
                          case 1:
                            return <div className="success-message text-sm flex items-center">Success! Message sent.</div>
                          // pending case
                          case 0.5:
                            return (
                              <div className="spinner">
                                <div className="bounce1"></div>
                                <div className="bounce2"></div>
                                <div className="bounce3"></div>
                              </div>
                            )
                          default:
                            return ""
                        }
                      })()}
                      <input
                        type="submit"
                        name="submitButton"
                        value="Submit"
                        onClick={this.handleSubmit}
                        className="ml-4 max-w-150 std-button"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </LayoutSingleColumn>
      </Layout >
    );
  }
}

export default Contact;

const query = graphql`
  query contactQuery {
    allStrapiSocialmedia(sort: {fields: order, order: ASC}) {
      nodes {
        id
        image
        link
        name
      }
    }
    strapiSmallText(label: {eq: "Contact Page"}) {
      content
    }
  }`;