import React, { memo, useMemo } from 'react';

export const MarkText = memo(({ originalText, markText }) => {
  const result = useMemo(() => {
    if (!originalText) {
      return null;
    }
    if (!markText) {
      return originalText;
    }

    //const re = new RegExp(markText, 'ig');
    //return originalText.replace(re, `<mark>${markText}</mark>`);

    const index = originalText.toLowerCase().indexOf(markText.toLowerCase());

    if (index < 0) {
      return originalText;
    }

    const length = markText.length;
    if (index == 0) {
      return (
        <>
          <mark>{originalText.substr(0, length)}</mark>
          {originalText.substr(length)}
        </>
      );
    }

    return (
      <>
        {originalText.substr(0, index - 0)}
        <mark>{originalText.substr(index, length)}</mark>
        {originalText.substr(index + length)}
      </>
    );
  }, [originalText, markText]);
  return <div>{result}</div>;
});

MarkText.displayName = 'MarkText';
