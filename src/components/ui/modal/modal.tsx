// import { FC, memo } from 'react';

// import styles from './modal.module.css';

// import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
// import { TModalUIProps } from './type';
// import { ModalOverlayUI } from '@ui';

// export const ModalUI: FC<TModalUIProps> = memo(
//   ({ title, onClose, children }) => (
//     <>
//       <div className={styles.modal}>
//         <div className={styles.header}>
//           <h3 className={`${styles.title} text text_type_main-large`}>
//             {title}
//           </h3>
//           <button className={styles.button} type='button'>
//             <CloseIcon type='primary' onClick={onClose} />
//           </button>
//         </div>
//         <div className={styles.content}>{children}</div>
//       </div>
//       <ModalOverlayUI onClick={onClose} />
//     </>
//   )
// );

import { FC, memo } from 'react';
import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import styles from './modal.module.css';
import { ModalOverlayUI } from '@ui';

type TModalUIProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children }) => (
    <>
      <div id='modals' className={styles.modal}>
        <div className={styles.header}>
          <h3 className={`${styles.title} text text_type_main-large`}>
            {title}
          </h3>
          <button
            id='modals'
            aria-label='Закрыть'
            className={styles.button}
            type='button'
            onClick={onClose}
          >
            <CloseIcon type='primary' />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlayUI onClick={onClose} />
    </>
  )
);
