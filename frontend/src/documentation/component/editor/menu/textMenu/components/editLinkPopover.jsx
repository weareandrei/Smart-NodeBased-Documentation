// import { LinkEditorPanel } from '@/components/panels';
// import { Icon } from '@/components/ui/Icon';
// import { Toolbar } from '@/components/ui/Toolbar';
// import * as Popover from '@radix-ui/react-popover';

export const EditLinkPopoverProps = {
    onSetLink: (link, openInNewTab) => {},
};

export const EditLinkPopover = ({ onSetLink }) => {
    return (
        <div></div>
        // <Popover.Root>
        //     <Popover.Trigger asChild>
        //         <Toolbar.Button tooltip="Set Link">
        //             <Icon name="Link" />
        //         </Toolbar.Button>
        //     </Popover.Trigger>
        //     <Popover.Content>
        //         <LinkEditorPanel onSetLink={onSetLink} />
        //     </Popover.Content>
        // </Popover.Root>
    );
};
