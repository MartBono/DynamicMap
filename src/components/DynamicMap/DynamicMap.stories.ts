import type { Meta, StoryObj } from '@storybook/react-vite';
import { TestMap } from './default-map';
import CartoStyle from './overlayStyle/carto';
import ColorfulStyle from './overlayStyle/colorful';

const meta = {
  title: 'Maps/DynamicMap',
  component: TestMap,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A dynamic map component built with MapLibre GL for displaying interactive maps with customizable overlays.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    overlays: {
      description: 'Array of overlay styles to display on the map',
      control: 'object'
    }
  }
} satisfies Meta<typeof TestMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Carto: Story = {
  args: {
    overlays: [CartoStyle]
  },
  parameters: {
    docs: {
      description: {
        story: 'A map displaying the Carto overlay style, showcasing streets and terrain details.'
      }
    }
  }
};

export const Colorful: Story = {
  args: {
    overlays: [ColorfulStyle]
  },
  parameters: {
    docs: {
      description: {
        story: 'A map displaying the Colorful overlay style, featuring vibrant colors and artistic representations.'
      }
    }
  }
};
