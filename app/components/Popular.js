var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');


const SelectLanguage = (props) => {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return(
        <ul className='languages'>
          {languages.map((lang) => {
            return(
              <li
                  style={lang === props.selectedLanguage ? { color: '#d0021b'} : null}
                  onClick={props.onSelect.bind(null, lang)}
                  key={lang}>
                      {lang}
              </li>
            )
        })}
        </ul>
    )
}
SelectLanguage.propTypes = {
    selectedLanguage : PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

function RepoGrid(props) {
    return (
        <ul className='popular-list'>
            {props.repos.map((repo, index) =>){
                <li key={repo.name} className='popular-item'>

                </li>
            }}
        </ul>
    )
}


class Popular extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos : null,

        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }
    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }
    updateLanguage(lang) {
        console.log('selected: '+lang);
        this.setState(() => {
            return {
                selectedLanguage: lang,
                repos: null
            }
        });
        api.fetchPopularRepos(lang)
            .then(repos => {
                this.setState(() => {
                    return {
                        repos: repos
                    }
                })
            });
    }
    render() {
        return (
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage} />
                <RepoGrid repos={this.state.repos} />
            </div>
        )
      }
    }




module.exports = Popular;
