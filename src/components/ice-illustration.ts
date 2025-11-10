import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type IllustrationType =
  | 'landing'
  | 'impact'
  | 'confidence'
  | 'effort'
  | 'tier1'
  | 'tier2'
  | 'tier3'
  | 'tier4'
  | 'tier5';

const illustrationMap: Record<IllustrationType, { src: string; alt: string }> = {
  landing: {
    src: '/illustrations/landing-illustration.png',
    alt: 'Product manager at crossroads with multiple priorities',
  },
  impact: {
    src: '/illustrations/impact-illustration.png',
    alt: 'Target with arrows showing impact',
  },
  confidence: {
    src: '/illustrations/confidence-illustration.png',
    alt: 'Magnifying glass examining data and research',
  },
  effort: {
    src: '/illustrations/effort-illustration.png',
    alt: 'Calendar and clock representing time and effort',
  },
  tier1: {
    src: '/illustrations/tier1-illustration.png',
    alt: 'Warning barrier - Low priority zone',
  },
  tier2: {
    src: '/illustrations/tier2-illustration.png',
    alt: 'Later pile - Medium priority',
  },
  tier3: {
    src: '/illustrations/tier3-illustration.png',
    alt: 'Kanban board - Good candidate',
  },
  tier4: {
    src: '/illustrations/tier4-illustration.png',
    alt: 'Thumbs up - Strong contender',
  },
  tier5: {
    src: '/illustrations/tier5-illustration.png',
    alt: 'Rocket launching - Top priority',
  },
};

@customElement('ice-illustration')
export class IceIllustration extends LitElement {
  @property() type: IllustrationType = 'landing';
  @property() width = '400';
  @property() height = '300';

  static styles = css`
    :host {
      display: block;
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
    }
  `;

  render() {
    const illustration = illustrationMap[this.type];

    return html`
      <img
        src="${illustration.src}"
        alt="${illustration.alt}"
        width="${this.width}"
        height="${this.height}"
        loading="lazy"
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ice-illustration': IceIllustration;
  }
}
