<?php

namespace App\Form;

use App\Entity\Transfer;
use App\Entity\User;
use App\Service\File\UploadFile;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;

class TransferType extends AbstractType
{
    public function __construct(
        private Security $security,
    ) {}

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, ['label' => 'Titre'])
            ->add('message')
            ->add('recepients', CollectionType::class, [
                'label' => 'Envoyer à',
                // each entry in the array will be an "email" field
                'entry_type' => EmailType::class,
                'delete_empty' => true,
                'allow_delete' => true,
                'allow_add' => true,
                'prototype' => true,
                // these options are passed to each "email" type
                'entry_options' => [
                    'attr' => ['class' => 'email-box'],
                    'label' => false
                ],
            ])
            ->add('file', FileType::class, [
                'label' => 'Fichiers',
                'mapped' => false,
                'required' => true,
                'constraints' => [
                    new File([
                        'maxSize' => '512m',
                        'mimeTypes' => [
                            ...UploadFile::ARCHIVE_MIMES,
                            ...UploadFile::AUDIO_MIMES,
                            ...UploadFile::CODE_MIMES,
                            ...UploadFile::IMAGE_MIMES,
                            ...UploadFile::PDF_MIMES,
                            ...UploadFile::PRESENTATION_MIMES,
                            ...UploadFile::TABLEUR_MIMES,
                            ...UploadFile::TEXTE_MIMES,
                            ...UploadFile::TRAITEMENT_DE_TEXTE_MIMES,
                            ...UploadFile::VIDEO_MIMES,
                        ],
                        'mimeTypesMessage' => 'Please upload a valid PDF document',
                    ])
                ],
            ])
            ->add('emiter', TextType::class, [
                'label' => 'Votre adresse e-mail',
                'data' => $this->getUserEmail() ?? '',
                'row_attr' => [
                    'class' => $this->getUser() instanceof User ? 'd-none' : '',
                ],
                'attr' => [
                    'disabled' => $this->getUser() instanceof User,
                ]
            ])
            ->add('save', SubmitType::class, ['label' => 'Transférer'])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Transfer::class,
        ]);
    }

    private function getUserEmail(): ?string
    {
        if ($this->getUser() instanceof User) {
            return $this->getUser()->getEmail();
        }

        return null;
    }

    /**
     * @return User|null
     */
    private function getUser(): ?User
    {
        $user = $this->security->getUser();

        return $user instanceof User ? $user : null;
    }
}
