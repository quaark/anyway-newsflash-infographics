import React, { FC, useRef, useState } from 'react';
import { Card, CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RoadImage from '../../assets/road-image.png';
import widgetToImage from '../../services/to-image.service';
import { AnyWayButton } from '../atoms/AnyWayButton';
import { Logo } from '../atoms/Logo';
import LamasImage from '../../assets/cbs.png';
import AnywayImage from '../../assets/anyway.png';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import CardEditor from '../organisms/CardEditorDialog';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';

import {
  fontFamilyString,
  cardWidth,
  cardHeight,
  cardPadding,
  cardContentHeight,
  cardActionsHeight,
} from '../../style';

interface IProps {
  widgetName: string;
}

const useStyles = makeStyles({
  root: {
    fontFamily: fontFamilyString,
    position: 'relative', // for meta tags
    width: cardWidth,
    height: cardHeight,
    padding: cardPadding,
    backgroundImage: `url(${RoadImage})`,
    boxSizing: 'border-box',
  },
  content: {
    height: cardContentHeight,
    boxSizing: 'border-box',
    padding: 0,
  },
  actions: {
    boxSizing: 'border-box',
    height: cardActionsHeight,
    padding: 0,
    alignItems: 'flex-end',
  },
  actionsSpace: {
    flex: 1,
  },
  button: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
});

const AnyWayCard: FC<IProps> = ({ widgetName, children }) => {
  const [isOpen, setOpen] = useState(false);
  const handleCardEditorOpen = () => setOpen(true);
  const handleCardEditorClose = () => setOpen(false);

  const classes = useStyles();
  const widget = useRef<HTMLDivElement>(null);
  const imgDownloadHandler = () => {
    if (widget && widget.current) {
      widgetToImage(widgetName, widget.current);
    }
  };

  return (
    <Card ref={widget} className={classes.root} variant="outlined">
      <CardContent className={classes.content}>{children}</CardContent>
      <CardActions className={classes.actions}>
        <AnyWayButton className={classes.button} disableRipple={true} onClick={imgDownloadHandler}>
          <GetAppOutlinedIcon />
        </AnyWayButton>
        <AnyWayButton className={classes.button} disableRipple={true} onClick={handleCardEditorOpen}>
          <SettingsOverscanIcon />
        </AnyWayButton>
        <CardEditor isOpen={isOpen} onClose={handleCardEditorClose} />
        <div className={classes.actionsSpace}></div>
        <Logo src={LamasImage} alt={'Lamas'} height={'30px'} />
        <Logo src={AnywayImage} alt={'Anyway'} height={'20px'} />
      </CardActions>
    </Card>
  );
};
export default AnyWayCard;
