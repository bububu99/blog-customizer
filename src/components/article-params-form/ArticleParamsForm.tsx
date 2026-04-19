import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useState, useRef } from 'react';
import styles from './ArticleParamsForm.module.scss';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
	currentSettings: ArticleStateType;
};

export const ArticleParamsForm = ({
	onApply,
	onReset,
	currentSettings,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(currentSettings);

	const formRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: formRef,
		onClose: () => setIsMenuOpen(false),
		onChange: setIsMenuOpen,
	});

	const handleChange = (key: keyof ArticleStateType) => (value: OptionType) => {
		setFormState((prev) => ({ ...prev, [key]: value }));
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onReset();
	};

	const handleSubmit = () => {
		onApply(formState);
		setIsMenuOpen(false);
	};

	return (
		<div ref={formRef}>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen((prev) => !prev)}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={handleChange('fontFamilyOption')}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleChange('fontSizeOption')}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleChange('fontColor')}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleChange('backgroundColor')}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleChange('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' onClick={handleReset} />
						<Button title='Применить' type='apply' onClick={handleSubmit} />
					</div>
				</form>
			</aside>
		</div>
	);
};
