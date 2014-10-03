/** @jsx React.DOM */
/* global React */

import ExampleMixin from '../mixins/example';
import CodeBlock from './code-block';
import LocaleSelect from './locale-select';
import {Tabs, Tab} from './tabs';

export default React.createClass({
    displayName: 'ReactExample',
    mixins     : [ExampleMixin],

    genderateRenderCode: function () {
        return [
            '/** @jsx React.DOM */',
            'React.renderComponent(',
            '    <Component locales={[\'' + this.state.currentLocale + '\']} ' +
                    'formats={…} messages={…} />',
            '    document.getElementById(\'example\')',
            ');'
        ].join('\n');
    },

    render: function () {
        var example       = this.props.example,
            currentLocale = this.state.currentLocale,
            messages      = this.props.intl.messages[currentLocale];

        var ExampleComponent = example.getComponent();

        var tabs = [
            <Tab label="Component">
                <CodeBlock lang="js">
                    {example.source.component}
                </CodeBlock>
            </Tab>,

            <Tab label="Render">
                <CodeBlock lang="javascript">
                    {this.genderateRenderCode()}
                </CodeBlock>
            </Tab>
        ];

        // Insert a "Message" tab if the example uses an i18n message.
        if (example.messageId) {
            tabs.splice(1, 0,
                <Tab label="Message" key="message">
                    <CodeBlock>
                        {messages[example.messageId]}
                    </CodeBlock>
                </Tab>
            );
        }

        return (
            <div id={example.id} className="example">
                <div className="example-source">
                    <Tabs>
                        {tabs}
                    </Tabs>
                </div>

                <div className="example-output">
                    <h4 className="example-output-heading">Rendered</h4>

                    <div className="react-output">
                        <ExampleComponent
                            locales={currentLocale}
                            formats={this.props.intl.formats}
                            messages={messages} />
                    </div>

                    <div className="example-output-controls">
                        <label>
                            <span className="example-label">Locale:</span>
                            <LocaleSelect
                                availableLocales={this.props.intl.availableLocales}
                                value={currentLocale}
                                onChange={this.updateLocale} />
                        </label>
                    </div>
                </div>
            </div>
        );
    }
});
