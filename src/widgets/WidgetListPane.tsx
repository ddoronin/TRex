import * as React from 'react';
import widgetFactory from "../api/widgetFactory";

interface IWidget {
    widgetId: string;
}

class WidgetBox extends React.Component<IWidget> {
    private widgetId: string;

    render(): JSX.Element {
        return (
            <div className="widget-item">
                {this.props.widgetId}
            </div>
        );
    }
}

class WidgetListPane extends React.Component {
    render(): JSX.Element {
        return (
            <article className="widget-list-pane">
                <section className="widget-list-container">
                    <div className="widget-list">
                        {widgetFactory.list().map(widgetId =>
                            <WidgetBox key={widgetId} widgetId={widgetId}/>
                        )}
                    </div>
                </section>
            </article>
        );
    }
}

export default WidgetListPane;