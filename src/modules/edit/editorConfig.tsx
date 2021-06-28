const buttons = [
    'source',
    'undo',
    'redo',
    '|',
    'paragraph',
    // 'font',
    'fontsize',
    'brush',
    'eraser',
    '|',
    'bold',
    'underline',
    'italic',
    '|',
    'ul',
    'ol',
    'outdent',
    'indent',
    'table',
    'hr',
    '|',
    'image',
    'video',
    'link',
    '|',
];

const link = {
    noFollowCheckbox: false,
    openInNewTabCheckbox: false,
};

export const config = {
    buttons: buttons,
    toolbarAdaptive: false,
    link: link,
    height: window.innerHeight - 80,
    style: {fontFamily: 'Roboto'}
};
