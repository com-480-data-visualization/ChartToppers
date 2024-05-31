# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
|Nil Yagmur Ilba|374228|
|Kaede Johnson|357472|
|Davide Romano|354025|


[Milestone 1](#milestone-1) • [Milestone 2](#milestone-2) • [Milestone 3](#milestone-3)

## Milestone 1 (29th March, 5pm)

**10% of the final grade**

*(max. 2000 characters per section)*

### Dataset

We will use the European Social Survey (ESS) [data portal](https://ess.sikt.no/en/?tab=overview) to extract a timeseries view of European citizens’ views on politics, societal norms, and more, while stratifying by gender in particular. [1] Our goal is to expand on work conducted by The Economist, The Financial Times, and other publications in exploring a recent trend of divergence in political and social opinion between the sexes.

The ESS is a biennial survey of randomly sampled citizens across 31 countries. It is meant to capture the sociopolitical opinions and conditions of private-household residents aged 15 and up in participating countries. The individual respondents are not stable year-to-year (it is not panel data, in other words), but rather sampled randomly and, for purposes of aggregation, assigned weights according to how representative they are of their country’s general population. 

A portion of the questions are asked during each round (or administration) of the survey. Other questions are temporary, collected from a pool of submissions sent by cross-cultural teams of European academics. We note that as survey data, our ‘ground truth’ is generated from participant response rather than more objective measurement. 

The ESS includes data at the level of the survey respondent and is generally well-maintained; for example, almost all features are encoded numerically thanks to survey questions that lend themselves to ordinal responses, and those numbers indicating a missing or refused response are clearly specified by robust data dictionaries. We therefore suspect data cleaning to be minimal. Pre-processing, meanwhile, will likely focus on (1) identifying and filtering to columns of interest and (2) grouping and aggregating by gender, age, and geography. The former can be handled via the ESS’ online portal while the latter is simple to code.

[Link](https://drive.switch.ch/index.php/s/zUVrlpnyXFoRs5b) to all variables in the dataset

### Problematic

> Frame the general topic of your visualization and the main axis that you want to develop.
> - What am I trying to show with my visualization?
> - Think of an overview for the project, your motivation, and the target audience.

Our inspiration stems from an Economist article entitled “Why young men and women are drifting apart”, which explores differences in (especially political) perspectives between young men and women. [2] The analysis is backed by data from the European Social Survey (ESS). 

We will (1) emphasize The Economist’s analysis regarding education, gender, and political views, and (2) communicate age- or gender-based differences in other factors possibly manifesting ideological divides. These ‘other factors’ include *habits* like intensity of media consumption, intensity of digital communication, and religious activity, or *life experiences* such as household composition, financial vulnerability, mental stress, and geographic situation (rural or urban, nation). Naturally, education and age will play a crucial role in our visualization just as they did in The Economist’s article. 

The *ideological outcomes* we will investigate include placement on the liberal-conservative scale, tolerance for immigrants and LGBTQ lifestyles, climate change beliefs, trust in politicians, democracy, and institutions, and participation in political activism. This set both captures and expands the focus of The Economist’s analysis.

Our visualization will be geared toward the general public, and especially those interested in societal opinions. It will be accessible, clear, and, given the fraught nature of political discourse, as inoffensive as possible. Our story will shed light on the direction of culture and political outcomes at the broadest level; accordingly, we want to impart an understanding of humanity’s direction while ensuring our audience is willing to share this resource with others. 

Summarizing questions:

- How do social norms and political attitudes vary by generation and gender?
- Which habits (eg media consumption) or life situations (eg financial vulnerability) might create these differences?
- How can we design a universally inoffensive visualization on this topic?

### Exploratory Data Analysis

> Pre-processing of the data set you chose
> - Show some basic statistics and get insights about the data

Data for the ESS has been collected every two years between 2002 and 2020 (inclusive), constituting 10 different rounds. The composition of participating countries over time can be seen below; 39 countries participated at least once while 15 participated in each round.

![alt text](https://github.com/com-480-data-visualization/ChartToppers/raw/master/m1_images/participants.png "participants")

All categorical variables are encoded numerically. Furthermore, each variable has a codebook to help us interpret the values. For one example, for the variable “highest level of education obtained” (*edulvla* in the dataset), we have the following values:

![alt text](https://github.com/com-480-data-visualization/ChartToppers/raw/master/m1_images/codebook.png "codebook")

Most variables follow a similar encoding. As a result, we can retain variables of interest and calculate their availability over time. The following is a list of the variables we are currently interested in:

1. Media consumption: newspol, newsppol, newsptot, rdpol, rdtot, tvpol, tvtot
2. Digital communication: netuse, netusoft, netustm
3. Religious activity: pray, rlgatnd, rlgdgr, rlgblg, rlgblge
4. Household composition: hhmmb, gndr*i* (*i* = person i in respondent’s household)
5. Financial vulnerability: hincfel, hinctnt, uemp12m
6. Mental Stress: hlthhmp, inmdisc, brghmef, crvctef, happy, health
7. Social life/Loneliness: inprdsc, sclact, sclmeet
8. Geographic Situation: region, region*cc* (*cc =* country code)
9. Gender: gndr
10. Age: yrbrn
11. Education: edlv*cc*, edlvp*cc* (*cc =* country code)
12. Ideological Outcomes:
    1. Liberal-Conservative Scale: lrscale
    2. Tolerance for Immigrants: imwbcnt, imueclt, imdfetn, impcntr
    3. Tolerance for LGBTQ lifestyles: freehms, hmsacld, hmsfmlsh
    4. Climate Change Beliefs: ccnthum, ccrdprs, wrclmch
    5. Trust in Governance: trstlgl, trstplc, trstprl, trstplt
    6. Political Activism: badge, bctprd, pbldmn

[Link](https://drive.switch.ch/index.php/s/C1ZODnHmBgECjqc) to selected variables in the dataset.

Most variables are missing data for few to no respondents, though a nonnegligible portion have up to 80% of data missing (see histogram below). We may add other variables to this set, in particular if stratification along gender and age lines could produce further interesting divisions.

![alt text](https://github.com/com-480-data-visualization/ChartToppers/raw/master/m1_images/missings.png "missings")

Finally, we show average of self-reported political leanings (lower = more liberal) for women and men as a proof of concept:

![alt text](https://github.com/com-480-data-visualization/ChartToppers/raw/master/m1_images/ideological_differences.png "ideological_differences")

### Related work


> - What others have already done with the data?
> - Why is your approach original?
> - What source of inspiration do you take? Visualizations that you found on other websites or magazines (might be unrelated to your data).
> - In case you are using a dataset that you have already explored in another context (ML or ADA course, semester project...), you are required to share the report of that work to outline the differences with the submission for this class.

**Prior Uses**

The ESS dataset is used by its providers and the academic community for socio-political and economic analyses, including a special issue on survey methodology [3, 4]. Apart from academia, journalists also analyze data releases; The Economist article mentioned in section 2, with its spare and austere visualizations, is one such example of how ESS data is employed.

**Originality**

While journalists do report on this data, they typically do so only through the lens of publications by academics. Our chief contribution will be accessing raw data to creating interactive, engaging, and robust visualizations that are novel among attempts to present this vast dataset. Furthermore, we aspire to create a visualization architecture that could serve as a valuable resource for leading news outlets in the future, making complex socio-political and economic analyses more digestible and sought after by the broader public.

**Inspiration**

Our project will employ maps enhanced with special colors and shapes to underscore time variant findings. We will develop sliders that highlight ideological differences as well as trends in time. The visualization will be developed in the style of Figure 1 below, while differentials will be transformed and presented in the style of Figure 2, with country, age, and gender segmentation capability. [5] Another source of inspiration is the flower model applied by the OECD on quality of life indices (Figure 3). [6, 7] We like how detailed information stems from an interactive map inside a simple site structure. Additionally, the idea of flower stem length depending on index size is stimulating (Figure 4). Finally, we will consider using the idea of the interactive text boxes emphasizing the difference between genders (see Figure 5). [8]

Figure 1:

![image](https://github.com/com-480-data-visualization/ChartToppers/assets/80288512/25973e11-175e-4b3e-bd31-0577d46f223b)


Figure 2:

![alt text](https://github.com/com-480-data-visualization/ChartToppers/raw/master/m1_images/insp2.png "Figure 2")


Figure 3:

![alt text](https://github.com/com-480-data-visualization/ChartToppers/raw/master/m1_images/insp3.png "Figure 3")


Figure 4:

![alt text](https://github.com/com-480-data-visualization/ChartToppers/raw/master/m1_images/insp4.png "Figure 4")


Figure 5:

![alt text](https://github.com/com-480-data-visualization/ChartToppers/raw/master/m1_images/insp5.png "Figure 5")

### M1 Sources

- 1: *ESS Data Portal*. European Social Survey. https://ess.sikt.no/en/?tab=overview
- 2: "Why young men and women are drifting apart" The Economist, Mar 13th 2024, https://www.economist.com/international/2024/03/13/why-the-growing-gulf-between-young-men-and-women
- 3: *Measurement instruments for the Social Sciences*. BioMed Central. (n.d.). https://measurementinstrumentssocialscience.biomedcentral.com/ess
- 4: European Social Survey (ESS). (2020). The Human Values Scale Findings from the European Social Survey. ESS.
- 5: *Why Eu regions are redrawing their borders*. The Pudding. (n.d.). https://pudding.cool/2019/04/eu-regions/ 
- 6: Iversen, K. (2017, August 24). *7 data visualizations that opened the world’s eyes to gender inequality*. Medium. https://medium.com/@Katja_Iversen/7-data-visualizations-that-opened-the-worlds-eyes-to-gender-inequality-75ee03b60589
- 7: *OECD regional well-being - how is life?*. Being. https://www.oecdregionalwellbeing.org/
- 8: https://datatopics.worldbank.org/sdgatlas/goal-5-gender-equality?lang=en

## Milestone 2 (26th April, 5pm)

**10% of the final grade**

The deliverables for milestone 2 can be found here:

[M2_ChartToppers.pdf](https://github.com/com-480-data-visualization/ChartToppers/files/15131897/M2_ChartToppers.pdf)

[Website prototype](https://com-480-data-visualization.github.io/ChartToppers/)

## Milestone 3 (31st May, 5pm)

**80% of the final grade**

The deliverable for milestone 3 can be found here:

**[Screencast](https://drive.google.com/file/d/1i6mzmwY3JM1qYD1PcLklppdw9gS2yAb6/view?usp=sharing)**

**[Website](https://com-480-data-visualization.github.io/ChartToppers/)**
The website is hosted by Github Pages and is available [here](https://com-480-data-visualization.github.io/ChartToppers/).

[ProcessBook_ChartToppers.pdf]()

**Getting the Website Running (Development Mode):**

1. Clone the repository.
2. Navigate to the website's folder on your computer.
3. Run these commands in order:
    - npm install (installs necessary tools)
    - npm run dev (starts the development server)
The terminal will show the local website's URL where you can view it.

**Building the Website for Production:**

Clone the repository if you haven't already (get a copy of the code).
Go to the website's folder.
Run these commands in order:
- npm install (installs necessary tools)
- npm run build (creates a production-ready version)

**Data**
The data is available in the folder website/src/data.

## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone

