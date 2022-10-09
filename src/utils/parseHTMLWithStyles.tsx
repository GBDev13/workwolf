import HTMLReactParser, {
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";

export function parseHTMLWithStyles(data: string) {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      const { name, children } = domNode as Element;
      if (name === "ul") {
        return (
          <ul className="list-disc pl-7">{domToReact(children, options)}</ul>
        );
      }
    },
  };

  return HTMLReactParser(data, options);
}
