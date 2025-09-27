import * as aiIcons from 'react-icons/ai';  // Import all icons from react-icons/ai
import * as bsIcons from 'react-icons/bs';  // Import all icons from react-icons/fa
import * as mdIcons from 'react-icons/md';  // Import all icons from react-icons/md'
import * as giIcons from 'react-icons/gi';  // Import all icons from react-icons/gi'
import * as ghIcons from 'react-icons/go';  
import * as biIcons from 'react-icons/bi';  
import * as vscIcons from 'react-icons/vsc';  
import * as loIcons from 'react-icons/lu';
import * as ciIcons from 'react-icons/ci';
import * as cgIcons from 'react-icons/cg';
import * as fiIcons from 'react-icons/fi';
import * as faIcons from 'react-icons/fa';
import * as fa6Icons from 'react-icons/fa6';
import * as imIcons from 'react-icons/im';
import * as liaIcons from 'react-icons/lia';
import * as ioIcons from 'react-icons/io';
import * as io5Icons from 'react-icons/io5';
import * as piIcons from 'react-icons/pi';
import * as rxIcons from 'react-icons/rx';
import * as siIcons from 'react-icons/si';
import * as slIcons from 'react-icons/sl';
import * as tbIcons from 'react-icons/tb';
import * as tfiIcons from 'react-icons/tfi';
import * as tiIcons from 'react-icons/ti';
import * as wiIcons from 'react-icons/wi';
import * as luIcons from 'react-icons/lu';

export type IconCategory = 'fa' | 'md' | 'io' | 'lu' | 'All';


// Add other icon imports here
export type IconSetName = keyof typeof iconRegistry | 'all';

// Combine all icons into a single object
const iconRegistry = {
  ...aiIcons,
  ...bsIcons,
  ...mdIcons,
  ...giIcons,
  ...ghIcons,
  ...biIcons,
  ...vscIcons,
  ...loIcons,
  ...ciIcons,
  ...cgIcons,
  ...fiIcons,
  ...faIcons,
  ...fa6Icons,
  ...imIcons,
  ...liaIcons,
  ...ioIcons,
  ...io5Icons,
  ...piIcons,
  ...rxIcons,
  ...siIcons,
  ...slIcons,
  ...tbIcons,
  ...tfiIcons,
  ...tiIcons,
  ...wiIcons,
  ...luIcons,
  // Add other icon registrations here
};


export const getIconComponent = (iconName: string): React.ElementType | undefined => {
  return iconRegistry[iconName as keyof typeof iconRegistry];
};